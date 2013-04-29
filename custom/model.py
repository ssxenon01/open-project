# This Python file uses the following encoding: utf-8
from google.appengine.api import users
from google.appengine.ext import db
import datetime

class Repo(db.Model):
    name = db.StringProperty(required=True)
    # type = db.StringProperty(required=True, choices=set(["cat", "dog", "bird"]))
    dateCreated = db.DateProperty()
    apiUrl = db.StringProperty()
    repoUrl = db.StringProperty()

class Project(db.Model):
    name = db.StringProperty(required=True)
    description = db.StringProperty(multiline=True)
    dateCreated = db.DateTimeProperty(default=datetime.datetime.now())
    lastUpdated = db.DateTimeProperty(auto_now_add=True)
    priority = db.IntegerProperty()