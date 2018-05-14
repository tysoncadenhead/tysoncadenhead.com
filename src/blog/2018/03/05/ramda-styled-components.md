I absolutely love it when I can use two separate libraries together seamlessly. One great combination I have found is with the Styled-Components visual primitives and a functional programming utility library called Ramda.

<!-- more -->

The place where this can really shine it when you are using Styled-Components to pull in dynamic values from your theme. An example of this might be:

```
const Container = styled.View`   
    background-color: {props => props.theme.primaryBackgroundColor};
`;
```

Using the StyleProvider, you can use this to pass down whatever theme object you like, which is really one of the most powerful features of Styled-Components.

Unfortunately, by making an inline function like the one in our example, we have created a part of our code that is difficult to test. Luckily, Ramda has a path() function that can help us out. Path basically looks like this:

```
const result = props => 
    R.path(['theme', 'primaryBackgroundColor'], props);
```

It takes an array as the first argument and the object to parse as the second argument. Using the array as the nested keys to retrieve, it dives into the provided object and returns the value. This means that the code above is basically the same as this:

```
const result = props => 
    props.theme.primaryBackgroundColor;
```

However, the great thing about Ramda is that all of the functions are curried. That means that the function isn’t executed until you provide all of the arguments. So our code above could also be expressed as:

```
const result = props => 
    R.path([‘theme’, ‘primaryBackgroundColor’])(props);
```

With that in mind, we can make the function “point free”, meaning that we are returning it expecting it to be executed with the final variable that is required. Since we are passing in our props to our “result” function and then passing those props into the `R.path()` function, we could express the same function like this:

```
const result = 
    R.path([‘theme’, ‘primaryBackgroundColor’]);
```

With that, our function will automatically have 100% test coverage just by being included in the file that is being tested because it now has no surface area. So returning to our Styled-Component, we can achieve the same result like this:

```
const Container = styled.View`
    background-color: ${R.path([‘theme’, ‘primaryBackgroundColor’])};
`;
```