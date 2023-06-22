import { SyncLoader } from 'react-spinners'

function InButtonLoader({color , size}) {
  return (
    <SyncLoader size={10 || size} color= {'#ffffff' || color}  />
  )
}

export default InButtonLoader