

export const BookSearch = () =>{






const handleChange = () =>{

}







    return(

        <div className="search-types-div">

<div className="email mb-3">
    <label className='form-label' htmlFor="email">Admin email</label>
    <input type='text' name='email' id='email' placeholder='admin email' onChange={handleChange} value={credentials.email} className='form-control'/>
    <button  className="btn btn-primary btn-lg"  onClick={showBooks}>search</button>
</div>

<div className="email mb-3">
    <label className='form-label' htmlFor="email">Admin email</label>
    <input type='text' name='email' id='email' placeholder='admin email' onChange={handleChange} value={credentials.email} className='form-control'/>
    <button  className="btn btn-primary btn-lg"  onClick={showBooks}>search</button>
</div>

<div className="email mb-3">
    <label className='form-label' htmlFor="email">Admin email</label>
    <input type='text' name='email' id='email' placeholder='admin email' onChange={handleChange} value={credentials.email} className='form-control'/>
    <button  className="btn btn-primary btn-lg"  onClick={showBooks}>search</button>
</div>

</div>
    )
}