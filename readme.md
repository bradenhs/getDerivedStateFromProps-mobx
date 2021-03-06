# Setup

* Clone project `git clone git@github.com:bradenhs/getDerivedStateFromProps-mobx.git`
* Install dependencies `yarn`
* Run `yarn start`
* Open browser `http://localhost:1234`

# Explanation

I tried to come up with a non-trivial yet simple example of how React's
new static method `getDerivedStateFromProps` and deprecation of
`componentWillReceiveProps` will make it impossible to manage local
component state with mobx when that state needs to be updated as a result
of a props change.

The example is a simple paginated list component. The rows the component
displays are passed in as a prop but the current page you are viewing
is part of the component's local state. The current page of the component
will be updated when the rows prop changes and the resulting number of total
pages makes it so the current page is now out of bounds. To see this
behaviour click "next page" until you are at the last page. Then click
the "remove rows" button. You should see the current page change to the
new total number of pages.

There's a mobx component and an idential component using react's setState
mechanism and the new static method `getDerivedStateFromProps`. Currently
`componentWillReceiveProps` still works. I'm not sure, however, how
updating local component state managed by mobx as a result of a change in
props will work when `componentWillReceiveProps` is eventually removed from
react.
