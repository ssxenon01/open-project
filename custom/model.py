# This Python file uses the following encoding: utf-8
from google.appengine.api import users , memcache
from google.appengine.ext import db
import datetime

class Repo(db.Model):
    name = db.StringProperty(required=True)
    # type = db.StringProperty(required=True, choices=set(["cat", "dog", "bird"]))
    dateCreated = db.DateProperty()
    apiUrl = db.StringProperty()
    repoUrl = db.StringProperty()

class Project(db.Model):
    name = db.StringProperty()
    description = db.StringProperty(multiline=True)
    dateCreated = db.DateTimeProperty(default=datetime.datetime.now())
    lastUpdated = db.DateTimeProperty(auto_now_add=True)
    repo = db.StringProperty()
    web = db.StringProperty()
    image = db.StringProperty()
    events = db.StringProperty()
    priority = db.IntegerProperty()

    def fromMap(self,data):
        for k in data:
            if(data[k] is not None):
                setattr(self,k,data[k])
        return self

    def toMap(self):
        return {'id':self.key().id_or_name(),
            'name':self.name,
            'description':self.description,
            'priority':self.priority,
            'repo':self.repo,
            'web':self.web,
            'image':self.image,
            'events':self.events,
            'dateCreated':str(self.dateCreated),
            'lastUpdated':str(self.lastUpdated)}

    