This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Dict Manager

`Dict Manager` is simple dictionary management tool.

Please install dependencies using: `npm i`. You can run project with: `npm run start`.

# Info

The `Domain` of a dictionary represents the original value to transform, the `Range` of a dictionary represents
the desired value.

*Dictionary Consistency*

* `Duplicate Domains/Ranges`: Two rows in the dictionary map to the same value, simply resulting in duplicate content.
* `Forks or Duplicate Domains with different Ranges`: Two rows in the dictionary map to different values, resulting in an ambiguous transformation.
* `Cycles`: Two or more rows in a dictionary result in cycles, resulting in a never-ending transformation.
* `Chains`: A chain structure in the dictionary (a value in Range column also appears in Domain column of another entry), resulting in inconsistent transformation.
