import { useState, useEffect } from "react"
import Axios from 'axios'

export const useGetData = (dataUrl) => {

  const [ data, setData ] = useState([])
  const [ isPennding, setIsPennding ] = useState(true);
  const [ err, setErr] = useState(null)

  useEffect(() => {
      Axios.get(`http://localhost:3001${dataUrl}`)
        .then(res => {
          setData(res.data);
          setIsPennding(false);
          setErr(null);
        })
        .catch(err => {
          setIsPennding(false);
          setErr(err.message);
        })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 

  return { data, isPennding, err };
}