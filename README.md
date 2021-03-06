# Star Wars App

## Description

#### Problem

The goal of this assignment was to use React and the Fetch API to fetch data from SWAPI.dev (Star Wars API) and generate a list of characters with information about those characters.

#### Solution

To begin, I planned out how I would approach this app by making a simple tester app that fetched data from SWAPI and displayed it to get a basic feel for the project. I then began to get an idea of what components i'd need to make, such as a list page, a character page and a person/people component.

From there, I started to systematically work through all the assignment requirements feature by feature. I started working on displaying a list of the characters with the ListPage component by making a fetch function and then once I had that working, I made the next/prev buttons for pagination and continued on through the list until I felt I satisfied all of the requirements.

## Technical and Architectural Choices

#### React Hooks vs Redux

The assignment mentioned I needed to use React Hooks or Redux for state management, and since I haven't had much working experience with Redux, I decided to go with React Hooks because I'm much more familiar with them. I didn't use useReducer even though its a similar solution to Redux from what I understand. I felt that in the interest of time, it would be much wiser to stick to what I know than spending time learning useReducer or Redux, and I knew I could get this assignment done with the knowledge of React and Hooks I had already.

#### Fetching & Helper Functions

I realized early on that I would need to do multiple fetches and that lead me to create a helper function file to store the fetch functions in case I would need to reuse them at any point. I ran into an issue when trying to fetch the CharacterPage data because when I would fetch the data initially, some of the object properties would return urls that required more fetching (such as films, vehicles, etc.). I had to do some research to figure out a good way to do nested fetching to get all the character data and I found that if I stored the fetch response and json data in variables using async/await instead of passing them through a huge pipeline of .then(), I would be able to reuse those variables for many different fetches in the same function, then return all the character data together. Then, for the data that returned multiple items, I used Promise.all() to wait for them to resolve. It worked out really nicely and I'm happy with the solution.

#### Routing

##### ids

I found that the data from SWAPI didn't include any ids to associate with the characters, so my solution was to extract the id number in their urls (such as people/82/) and use that same id number for my routing to ensure consistency. I used regex to grab the ids and then used React Router Links to pass the ids to the components. Then, I could use the match prop in CharacterPage to get the id to fetch that character's data. In the ListPage component, I had to make use of the useParams hook because my Links in there linked to routes in the ListPage, so I couldn't use match (more about that later).

##### url State

When creating routing for the ListPage, I found that I had to make a url state because when I would press the next/prev buttons, I would need to fetch the next page's data every time the url changed, so I added it as a dependency for the useEffect.

##### Back Button

I found an easy solution to the back button for the CharacterPage using the useHistory hook to simply remember the last page the user visited and go back to it. However, I ran into an issue where even if the ListPage url was past page 1, it would still only render page 1 when I pressed back. I had to think about how my entire routing process worked and then I decided to use the id from useParams in my useEffect to check if the id was greater then 1, and if it was, it would set the url to that specific page instead of the default with no id.

#### Other Thoughts

##### Missing Data from SWAPI

Weirdly enough, I found that https://swapi.dev/api/people/17/ doesn't actually exist, it returns a 404. I stumbled upon this completely by accident, but I'm glad I did because I added in some code to deal with pages that I was originally just throwing an error on if the fetch didn't return anything. I didn't like that it would show an ugly error page so instead of throwing an error in my fetches, I created an empty object that just tells the user the data couldn't be found.

##### Design / Images

I had the idea from the beginning that a retro-style terminal look to the app would be really cool. However, when I started designing it, I felt that without animations it might not feel right, and the animations would have taken me too long to implement. I remembered that I liked the menu UI from Star Wars Battlefront 2 so I tried to emulate that instead of my original terminal design. I then ran into the issue of finding a nice background image that was free use, and I wanted an image of a starship hangar, so after not having luck with that I went back to my terminal idea and decided to just design it without the animations and see what it looked like. It turns out it looks really good and the animations weren't vital! I'm happy with the look and I think it feels very apt to have a command line / terminal look for data that has no images, it feels like I'm looking into a database from a lost world from long ago.

## Trade-offs, Additional Content & Reflection

If I had time to learn Redux, I think that's the main thing I would have wanted to try implementing. I saw the potential for its usefulness early on when I wanted to fetch data and pass it to both my components and I thought the idea of a store where you could grab state data from would be good for that.

I don't believe I left anything out of the initial requirements so I'm happy about that. It was my goal from the beginning to make an app that met all the requirements (including bonus points) and had some cool CSS to top it all off and I think I accomplished that.

If I were to spend more time on the project I would:

- Make pages for additional data instead of just characters
- Add slick animations to make the page feel alive
- Try learning and using Redux

## Closing Thoughts

Overall, it was a great project to work on to hone my React skills and learn some new things along the way, so I'm very glad I did it! It was also fun that it had to do with Star Wars because every time I made good progress the title theme would start playing in my head.
