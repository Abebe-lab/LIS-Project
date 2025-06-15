import { useEffect, useState } from 'react';
import './CustomCard.css';
export default function CustomCard({title, body,imgSource,commandMessage='View Detail', onClick,type='SMALL', showButton=true}){
    const [cardWidth,setCardWidth]=useState('20rem');

    useEffect(()=>{
      if(type==='LARGE'){
        setCardWidth('100%');
      }
      else if(type==='MEDIUM'){
        setCardWidth('40rem');
      }else{
        setCardWidth('20rem');
      }
    },[type])
    return(
        /*<div className={`card {type}` } style={{width: '18rem'}} onClick={onClick}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          {imgSource ?<img className="card-img-top" src={imgSource} alt={`Card image caption: ${imgSource}`}/>:<p className="card-text">{body}</p>}
          {
            //onClick && <button className="btn btn-primary" onClick={onClick}>{commandMessage}</button>
          }
        </div>
      </div>*/
      <div className="card" style={{width: cardWidth, height: '15rem'}}>
        {imgSource && (<img src={imgSource} className='card-image' alt="..."/>)}
        <div className="card-body  d-flex flex-column">          
            <h5 className="card-title text-start">
              {title}
            </h5>     
            <p className="card-text text-wrap">
              {body && body}
            </p>          
            {showButton && (<a href="#" className="btn btn-primary mt-auto" onClick={onClick}>{commandMessage}</a>)}
        </div>
      </div>
    );
}