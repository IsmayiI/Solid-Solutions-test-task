# Tree Project

This is a single-page web application that displays arbitrary text nodes in a tree structure. Users can add new nodes (roots) and delete existing ones.

## Key Features

- The initial state of the page includes only the "Create Root" button. Clicking on it creates a tree root with the text "Root."
- Each root has two buttons: "Add Node" (+) and "Delete Node" (-).
- Clicking on "+" creates a new node to the right and below the node next to which the button was pressed.
- Clicking on "-" deletes the node along with all its nested nodes.
- A button with a right arrow is added to the left of the nodes. Clicking it expands the node, and the arrow changes its appearance.
- Leaves (nodes without nested nodes) do not have an expand button.

## Data Storage

Node data is stored in the browser's localStorage to preserve the application state between sessions.

## Technologies and Tools

- Technologies used: HTML, CSS, JavaScript.
- Bootstrap was utilized for styling the page.
