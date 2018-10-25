
## To use this project, you should follow this guide.
"reference page"
https://velopert.com/436

## How to set up db
- install mongodb
  - sudo brew install mongodb
  - sudo mkdir /data/db
  - sudo mongod

- go to right folder first
  - cd ./MERN_STACK

- import db into your local mongodb server
  - mongoimport --jsonArray  -d YoutubeContents -c scripts ./mern_frame/data/dbAssets/scripts.json
  - mongoimport --jsonArray  -d YoutubeContents -c videos ./mern_frame/data/dbAssets/videos.json

done.

## manually start mongo and create db
- "start mongo"
  - sudo mongo
- "use and create collector"
  - use YoutubeContents
## insert values
- db.scripts.insert({{"videoid" : "M7lc1UVf-VE", "script" :
        [
            {"time": 0, "text":["txt1", "txt2", "txt3"]},
            {"time": 5, "text":["txt1", "txt2", "txt3"]},
            {"time": 15, "text":["txt1", "txt2", "txt3"]},
            {"time": 22, "text":["aaa", "bbb", "ccc"]},
            {"time": 60, "text":["txt1", "txt2", "txt3"]}
        ]
    }});
## check you work and db
- show dbs
- db.scripts.find().pretty();


