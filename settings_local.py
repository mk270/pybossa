# DEBUG = False

## webserver host and port
# HOST = '0.0.0.0'
# PORT = 5000

SECRET = 'foobar'
SECRET_KEY = 'my-session-secret'

ITSDANGEORUSKEY = 'its-dangerous-key'

## project configuration
BRAND = 'PyBossa'
TITLE = 'European Cultural Tagging'
LOGO = 'logo'
COPYRIGHT = 'Instituut voor Beeld en Geluid'
DESCRIPTION = 'A cultural tagging game for museums and similar institutions'
TERMSOFUSE = 'http://okfn.org/terms-of-use/'
DATAUSE = 'http://opendatacommons.org/licenses/by/'


## External Auth providers
# TWITTER_CONSUMER_KEY=''
# TWITTER_CONSUMER_SECRET=''
# FACEBOOK_APP_ID=''
# FACEBOOK_APP_SECRET=''
# GOOGLE_CLIENT_ID=''
# GOOGLE_CLIENT_SECRET=''


## list of administrator emails to which error emails get sent
# ADMINS = ['me@sysadmin.org']

## logging config
# Sentry configuration
# SENTRY_DSN=''
## set path to enable
# LOG_FILE = '/path/to/log/file'
## Optional log level
# import logging
# LOG_LEVEL = logging.DEBUG

## Mail setup
MAIL_SERVER = 'localhost'
MAIL_USERNAME = None
MAIL_PASSWORD = None
MAIL_PORT = 25
MAIL_FAIL_SILENTLY = False
DEFAULT_MAIL_SENDER = 'PyBossa Support <info@pybossa.com>'

## Announcement messages
## Use any combination of the next type of messages: root, user, and app owners
## ANNOUNCEMENT = {'admin': 'Root Message', 'user': 'User Message', 'owner': 'Owner Message'}

## Cache setup. By default it is disabled, you can use "simple" or "memcached"
## Check the documentation for further details on flask-cache
CACHE_TYPE = 'null'
### Cache setup. By default it will use SimpleCache 
## If you want to use memcached install python-memcached (pip install python-memcached)
#CACHE_TYPE = 'memcached'
#CACHE_MEMCACHED_SERVERS = ['127.0.0.1:11211']CACHE_MEMCACHED_SERVERS = ['127.0.0.1:11211']
