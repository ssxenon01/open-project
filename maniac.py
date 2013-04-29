# This Python file uses the following encoding: utf-8
import webapp2
import jinja2
import os
from google.appengine.api import users ,memcache
from google.appengine.ext import db
from google.appengine.api import memcache
import cgi
import datetime
import logging
import json
from custom.model import Repo ,Project

class BaseHanler(webapp2.RequestHandler):
    @webapp2.cached_property
    def jinja2(self):
        return jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

    def render_template(self, filename, args):
        out = memcache.get('render|%s'%filename)
        if out is None:
            out = self.jinja2.get_template(filename).render(args)
            memcache.set('render|%s'%filename,out)
        self.response.write(out)

class MainPage(BaseHanler):
    def get(self):
        # if users.get_current_user():
        #     url = users.create_logout_url(self.request.uri)
        #     url_linktext = 'Logout'
        # else:
        #     url = users.create_login_url(self.request.uri)
        #     url_linktext = 'Login'

        template_values = {}
        self.render_template('templates/index.jinja2',template_values)

" /api/project Restful service handler "

class ProjectHandler(BaseHanler):
    def get(*args):
        self = args[0]
        result = []
        if len(args) == 1 :
            limit = int(self.request.get('limit')) if self.request.get('limit') else 20
            offset = int(self.request.get('start')) if self.request.get('start') else 0

            projects = memcache.get('%d:projects:%d' % (limit,offset))
            if projects is not None:
                result = projects
            else:
                for p in Project.all().run(limit=limit,offset=offset):
                    result.append(p.toMap())

                memcache.add('%d:projects:%d' % (limit,offset), result, 0)

            self.response.headers['x-total-count'] = str(Project.all().count())
        elif len(args) == 2 :
            p = memcache.get('project:%s'%args[1])
            if p is None:
                p = Project.get(db.Key.from_path('Project',int(args[1])))
                memcache.set('project:%s'%p.key().id_or_name(),p.toMap(),6000)
                result = p.toMap()
            else:
                result = p


        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(result))

    def post(self):
        data = json.loads(self.request.body)
        p = Project().fromMap(data)
        # p = Project(name=data['name'] , description=data['description'] , priority=data['priority'])
        p.put()
        memcache.set('project:%s'%p.key().id_or_name(),p.toMap(),6000)
        result = p.toMap()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(result))

    def put(self,id):
        data = json.loads(self.request.body)
        p = Project.get(db.Key.from_path('Project',int(id)))
        for k in data:
            if data[k] is not None:
                setattr(p,k,data[k])
        p.put()
        memcache.set('project:%s'%p.key().id_or_name(),p.toMap(),6000)
        result = p.toMap()
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(result))

    # TODO: add Security with custom permission
    def delete(self,id):
        db.delete(db.Key.from_path('Project',int(id)))
        self.response.set_status(204)

class OAuthHandler(BaseHanler):
    def get(self):
        logging.info(self.request.get('access_token'))
        self.redirect("/")
        # consumer = oauth.Consumer(key="ded8255051ceb537fa36", 
        #     secret="15a71287de9b58f8c13376d8a5c50baa587f8d01")

        # request_token_url = "https://github.com/login/oauth/authorize?client_id=ded8255051ceb537fa36&redirect_uri=http://www.maniac.mn/oauth"

        # # Create our client.
        # client = oauth.Client(consumer)

        # The OAuth Client request works just like httplib2 for the most part.
    def post(self):
        logging.info(self.request.get('access_token'))
        self.redirect("/")
routes = [
    ('/', MainPage),
    ('/oauth',OAuthHandler),
    ('/api/project',ProjectHandler),
    (r'/api/project/(.*)',ProjectHandler),
]

app = webapp2.WSGIApplication(routes)