import React, { Component, useState, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';

const App = () => {

  const [value, setValue] = useState(1);
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <div>
        <button
          onClick={() => setValue(v => v + 1)}>
          +
        </button>
        <button
          onClick={() => setVisible(false)}>
          hide
        </button>
        {/* <ClassCounter value={value} /> */}
        {/* <HookCounter value={value} /> */}
        {/* <Notification /> */}
        <PlanetInfo id={ value } />
      </div>
    );
  } else {
    return <button onClick={() => setVisible(true)}>show</button>
  }
}

const getPlanet = (id) => {
  return fetch(`https://swapi.co/api/planets/${ id }/`)
          .then(resp => resp.json())
          .then(data => data)
}

const useRequest = (request) => {

  const initialState = useMemo(() => ({
    data: null,
    loading: true,
    error: null
  }), []);

  const [dataState, setDataState] = useState(initialState);

  useEffect(() => {
    setDataState(initialState);
    let canceled = false;
    request()
      .then(data => !canceled && setDataState({
        data,
        loading: false,
        error: null
      }))
      .catch(error => !canceled && setDataState({
        data: null,
        loading: false,
        error
      }));
    return () => canceled = true;
  }, [request, initialState]);
  
  return dataState;
}

const usePlanetInfo = (id) => {
  // const [name, setName] = useState(null);

  // useEffect(() => {
  //   let canceled = false;
  //   fetch(`https://swapi.co/api/planets/${ id }/`)
  //     .then(resp => resp.json())
  //     .then(data => !canceled && setName(data.name))
  //   return () => canceled = true;
  // }, [id]);
  
  // return name;

  const request = useCallback(
    () => getPlanet(id), [ id ]);
  return useRequest(request);
}

const PlanetInfo = ({ id }) => {
  // const [name, setName] = useState(null);

  // useEffect(() => {
  //   let canceled = false;
  //   fetch(`https://swapi.co/api/planets/${ id }/`)
  //     .then(resp => resp.json())
  //     .then(data => !canceled && setName(data.name))
  //   return () => canceled = true;
  // }, [id]);
  
  // return (
  //   <p>{ id } - { name }</p>
  // );

  // for own hook
  // const name = usePlanetInfo(id);
  // return (
  //     <p>{ id } - { name }</p>
  // );

  const { data, loading, error } = usePlanetInfo(id);

  if (error) {
    return <p>Something is wrong</p>
  }

  if(loading) {
    return <p>loading...</p>
  }
  return (
    <p>{ id } - { data.name }</p>
  )
}

// const HookCounter = ({ value }) => {
//   useEffect(() => {
//     console.log('mount');
//     return () => console.log('unmount')
//   }, []);

//   useEffect(() => console.log('update'));

//   return <p>{ value }</p>
// }

// const Notification = () => {
//   const [visible, setVisible] = useState(true);
//   useEffect(() => {
//     const timeout = setTimeout(setVisible, 2500, false);
//     return () => clearTimeout(timeout);
//   }, []);
//   return (
//     <div>
//       { visible && <p>Hello</p> }
//     </div>
//   );
// }

// class ClassCounter extends Component {
//   componentDidMount() {
//     console.log('class: mount');
//   }
//   componentDidUpdate() {
//     console.log('class: update');
//   }
//   componentWillUnmount() {
//     console.log('class: unmount');
//   }

//   render() {
//     return <p>{this.props.value}</p>
//   }
// }


ReactDOM.render(<App />, document.getElementById('root'));
