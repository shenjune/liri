# liri
liri app for HW 10

1. This is a simple CLI app allows users to retrieve media data from 3 different APIs. 
    --A. a Movie API
    --B. a Concert API
    --C. A music API (Spotify)
2. To access the app, go into the liri folder and open up the liri.js file. Right click on the file name in the menu and open up Terminal. 

3. Once in the Terminal of the liri folder, users can access the different APIs by:
    --A. for movies, type in "node liri.js move-this" [type in movie name]
        This will pull up general information on the movie, when it was published, actors in the film, IMBD rating, Rotten Tomatoes rating, plot description and primary language of the film. 

    --B. for music, type in "node liri.js spotify-this-song" [name of song]
        This will pull up the performer name, song name, a link to the song preview, and the album the song is in. If user enters a song title that has multiple versions and artists, they will appear in the search list. 

    --C. for concert, type in "node liri.js concert-this" [type in band]
        This will pull up recent information about the next concert for the band, location they are playing and time and date of the show. 

4. For a screenshot of how it works go to the demo folder. There are 3 screenshots--one for each of the type of searches. 
    --A. for movies, look at liri-demo
    --B. for concerts, look at concert-search
    --C. for music, look at spotify-search

5. That is it! A simple media search app for you to review and have fun with! 


6. Developed by: Jenn June with the helpful expertise of Marino Carranza. 
for more information, please contact: jennjunux@gmail.com
