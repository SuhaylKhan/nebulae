import { useSelector } from 'react-redux';

function Servers() {
  const servers = useSelector(state => state.servers);

  return (
    <>
      <h1>User's Servers</h1>
      {Object.keys(servers).map(serverId => {
        return (
        <ul key={serverId}>
          <li>{servers[serverId].name}</li>
        </ul>
      )
      })}
    </>
  )
}

export default Servers;
