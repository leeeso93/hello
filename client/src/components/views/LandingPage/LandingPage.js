import React ,{useEffect} from 'react'
import axios from 'axios'

function LandingPage() {

    // 랜딩페이지를 들어오자마자 이 request를 실행함 
    useEffect(()=>{
        axios.get('/api/hello').then(response =>console.log(response));
    },[]);

    return (
        <div>
            landing
        </div>
    )
}

export default LandingPage
