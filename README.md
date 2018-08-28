# Medium Investigator

A web app for visualizing the data of medium users.

## Getting Started 
Link to the [app](http://banacorn.com)

![](https://github.com/timerg/Medium-investigator/blob/master/mi.gif)

## Notes
The app is built with rca accompany with a stand alone express server.
The server send request to the Medium for user information. </br>
According to this [github issue](https://github.com/Medium/medium-api-docs/issues/48), there is no searching endpoints for the user post data.
I am only able to query less than the latest 10 posts of each user with querystring '?format=json'.
Hope this will be solved in the nearly future.
