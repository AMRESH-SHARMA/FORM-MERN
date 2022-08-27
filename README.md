# HOW TO USE?
```
Clone this repo
Fill env variables [inside server directory]
Internet connection: required
Activate: mongodb sever
RUN: npm install && npm run start [inside front directory]
RUN: npm install && node server.js [inside server directory]
```
____________________________________________________________________________________________

# TECH STACK

BACKEND:
```
multer
dotenv
cors
express
mongodb nodejs driver
fetch API
cloudinary nodejs driver (To upload media files)
```

FRONTEND:
```
react
tailwindcss
materialui-tailwindcss
```
____________________________________________________________________________________________

# 3 Web pages named:

**home**	Show form with 2 input field, image and video upload functionality form
page2	Shows grid of uploaded images.
page3	Shows Uploaded Video on clicking specific image.
____________________________________________________________________________________________
# home
Applied Clientside validations are:
```
Text input fields required.
Media upload extension validation using regex.
Thumbnail (Image - Formats - JPG and PNG only).
Video (Video file format - MPG, AVI, MP4 only).
```

After validation>> Hit post request to nodeserver using fetch api with FormData obj>> media get upload to cloudinary, get media LINKS as response from cloudinary>> Then save media links along with input field data to to mongodb>> response back to react server. If response 200 then, navigate to next page.

While performing whole data storing process on backend post button's state set to posting.

 ![1hom](https://user-images.githubusercontent.com/95286212/186668745-11cd1eeb-d008-413a-9f37-03ba087da62e.png)
____________________________________________________________________________________________
# page2

On initial loading, Fetch API hits get request to nodeserver>>nodeserver request all data from mongdb>> response back to react with data>> on receiving response with data MAP function make grid of cards populated with data. 

On clicking ImageCard navigate to next page3 with id as a parameter.

If fetch get request failed>> renders ServerError component.
If data is empty json>> renders NoResult component.

![2page](https://user-images.githubusercontent.com/95286212/186668954-0afc1190-02bd-423b-b96c-4f5dd132cf9d.png)

____________________________________________________________________________________________
# page3

FETCH API hit get request to nodeserver>> Nodeserver find video url stored on mongodb response back to react>> video tag populate video from cloudinary src ={URL} 
On populating video it get autoplay.

______________________________________________________________________________________________
#Tip

Can also use Mongodb Atlas as a hosted database for hosting purpose. Go inside server/mongodb.js for further process.


