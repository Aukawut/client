import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { CircularProgress } from '@mui/material'
function Travel() {
    const [travels,setTravals] = useState([])
    const [isLoading,setIsloading] = useState(true)
    useEffect(() => {
            axios.get('https://upset-seal-scarf.cyclic.app/travel').then((res) => {
                if(!res.data){
                    setIsloading(true)
                }else{
                    setIsloading(false)
                }
                console.log(res.data.results);
                setTravals(res.data.results)
            })
    },[])
    console.log(isLoading);
  return (
    <div>

        <h1 className='text-center'>Travel</h1>
        <hr />
        {isLoading ? <>
        <div className='d-flex justify-content-center'><CircularProgress/></div>
        
        </>:<>
        <div className="container">
                <div className="row">
                    {travels.map((val) => {
                        return (
                            <div className="col-12 col-lg-4 col-sm-3 col-xl-3" key={val.id} >
                            <div className="card shadow-lg mb-3 p-2" >
                                <h4 className='text-center'>{val.name}</h4>
                                <img src={val.coverimage} alt={val.name}></img>
                                <p className='text-wrap'>{val.detail}</p>
                            </div>
                        </div>
                        )
                    })}
                   
                    
                </div>
        </div>
        </>}
        
    </div>
  )
}

export default Travel