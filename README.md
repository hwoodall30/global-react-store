# global-react-store
React Global Store similar to Svelte

## Install
`npm i global-react-store-hook`

## Usage
```
//Stores/count-store.js
import {createStore} from 'global-react-store-hook';

export const count = createStore({
name: 'count-store',
initialState: {
store: 0
}
});
```

```
//App.jsx
import {count} from <rel-path-to-Store/count-store.js>
import {useStore} from 'global-react-store-hook'

export default function App(){
const [count, setCount] = useStore('count-store')

return(
<div>
<h1>{count.store}</h1>
</div>
)
}
