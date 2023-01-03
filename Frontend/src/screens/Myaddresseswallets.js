import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
function Myaddresseswallets() {

    const [addresses, setAddresses] = useState([]);
    const [wallets, setWallets] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const userInfo = JSON.parse(Cookie.get('userInfo'));
            const response = await fetch('http://localhost:3000/myAddresses',{
                method: 'POST',
                body: JSON.stringify({
                    user_id: userInfo[0][0].id
                }),
                headers: {
                    'Content-Type': 'application/json'
                    
            }
            });
            const data = await response.json();
            setAddresses(data[0]);
            console.log(data[0], " addreses")
            const response2 = await fetch('http://localhost:3000/myWallets',{
                method: 'POST',
                body: JSON.stringify({
                    user_id: userInfo[0][0].id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data2 = await response2.json();
            setWallets(data2[0]);
            console.log(data2[0], " wallets")
        }
        fetchData();
    }, []);

    function deleteadressItem(id){
        async function fetchdeleteadressData() {
          try {
            const response = await fetch('http://localhost:3000/addresses/deleteAddresses', {
              method: 'DELETE',
              body: JSON.stringify({
                id: id,
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
            if (response.ok) {
                // İstek başarılı olduğunda bir başarı mesajı gösterin
                alert('Ürün başarıyla silindi!');
              } else {
                // İstek başarısız olduğunda bir hata mesajı gösterin
                alert('Ürün silinirken hata oluştu!');
              }
    
          } catch (error) {
            console.error(error);
          }
        }
        fetchdeleteadressData();
        setAddresses([]);
        window.location.reload();
    
      }
    
        function deletewalletItem(id){
            async function fetchdeletewalletData() {
                try {
                    const response = await fetch('http://localhost:3000/wallets/deleteWallets', {
                        method: 'DELETE',
                        body: JSON.stringify({
                            id: id,
                            
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.ok) {
                        // İstek başarılı olduğunda bir başarı mesajı gösterin
                        alert('Ürün başarıyla silindi!');
                    } else {
                        // İstek başarısız olduğunda bir hata mesajı gösterin
                        alert('Ürün silinirken hata oluştu!');
                    }

                } catch (error) {
                    console.error(error);
                }
            }
            fetchdeletewalletData();
            setWallets([]);
            window.location.reload();
        }
    return (
        <div>
            <h1 className='title'>My Addresses & Wallets</h1>
            <div className="cart-table">
             <table>
             <h1 className='title'>Adresler</h1>
             <div className="cart-table">
                <thead>
                    <tr>
                        <th>Adres Adi</th>
                        <th>Şehir</th>
                        <th>Sokak</th>
                        <th>Posta Kodu</th>
                    </tr>
                </thead>
                <tbody>
                    {addresses.map((address) => (
                        <tr key={address.id}>
                            <td>{address.address}</td>
                            <td>{address.city}</td>
                            <td>{address.street}</td>
                            <td>{address.zipcode}</td>
                            <td><button onClick={() => deleteadressItem(address.id)}>Sil</button></td>
                        </tr>
                    ))}
                </tbody>
                </div>
                <h1 className='title'>Cüzdanlar</h1>   
                <div className="cart-table">
                <thead>
                    <tr>
                        <th>Cüzdan Adi</th>
                        <th>Kart Numarası</th>
                    </tr>
                </thead>
                <tbody>
                    {wallets.map((wallet) => (
                        <tr key={wallet.id}>
                            <td>{wallet.card_name}</td>
                            <td>{wallet.card_number}</td>
                            <td><button onClick={() => deletewalletItem(wallet.id)}>Sil</button></td>
                        </tr>
                    ))}
                </tbody>
                </div>            
             </table>
             </div>
        </div>
    )
}

export default Myaddresseswallets;