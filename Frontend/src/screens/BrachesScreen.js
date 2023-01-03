import react from 'react';
import { useEffect, useState } from 'react';

function BrachesScreen() {

 const [branches, setBranches] = useState([]);
 const [filtbranches, setFiltBranches] = useState([]);

 useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/branches');
      const data = await response.json();
      setBranches(data[0]);
    }
    fetchData();
    }, []);

    
function filterBranches(){
let city = document.getElementById('city').value;
let street = document.getElementById('street').value;
let zipcode = document.getElementById('zipcode').value;

if (document.getElementById('city').value === '') {
    city = null;
  }
  if (document.getElementById('street').value === '') {
    street = null;
  }
  if (document.getElementById('zipcode').value === '') {
    zipcode = null; 
  }
    async function fetchData() {
        const response = await fetch('http://localhost:3000/filter/getBranchesFilter', {
            method: 'POST',
            body: JSON.stringify({
                city: city,
                street: street,
                zipcode: zipcode
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data, " data0")
        setFiltBranches(data[0]);
        console.log(city, " input city")
        console.log(street, " input street")
        console.log(zipcode, " input zipcode")
    }
    fetchData();
}
    return (
        <div>
            <h1 className='title'>Branches</h1>
            <div className='cart-table'>
            <table>
            <h1 className='title'>Mevcut Magazalar</h1>
            <div className='cart-table'>
                <tr>
                    <th>Branch Name</th>
                    <th>Branch City</th>
                    <th>Branch Street</th>
                    <th>Branch Zipcode</th>
                </tr>            
                {branches.map(item => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.city}</td>
                        <td>{item.street}</td>
                        <td>{item.zipcode}</td>
                    </tr>
                ))}
             </div>
             <h1 className='title'>Magaza Arama</h1>
             <div className='cart-table'>
                <tr>
                    <td><input type="text" id="city" placeholder="City" /></td>
                    <td><input type="text" id="street" placeholder="Street" /></td>
                    <td><input type="text" id="zipcode" placeholder="Zipcode" /></td>
                    <td><button onClick={filterBranches}>Filter</button></td>
                  
                </tr>
                <br />
                <tr>
                    <th>Branch Name</th>
                    <th>Branch City</th>
                    <th>Branch Street</th>
                    <th>Branch Zipcode</th>
                </tr>
                {filtbranches.map(item => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.city}</td>
                        <td>{item.street}</td>
                        <td>{item.zipcode}</td>
                    </tr>
                ))}
                </div>
            </table>
            </div>
        </div>
    );

}

export default BrachesScreen;