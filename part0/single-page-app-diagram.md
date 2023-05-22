Create a diagram depicting the situation where the user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa.

```mermaid
    sequenceDiagram

    participant b as Browser
    participant s as Server

    b ->> s: get "/spa.html" file
    activate s
    s --> b: send html
    deactivate s

    b ->> s: get "/spa.css" file
    activate s
    s --> b: send css file
    deactivate s


    b ->> s: get "/spa.js" file
    activate s
    s --> b: send js file
    deactivate s

    Note over b: Javascript file requests data.json

    b ->> s: get data.json
    activate s
    s --> b: send json file
    deactivate s

    Note over b: javascript file gets data.json, parses data and renders it to the page




```