fetch('baseUrl/delete-admin/:UserId', {
    method: "DELETE",
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
})
.then(res => res.json())
.then(data => console.log(data))

fetch('baseUrl/add-product', {
    method: "POST",
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
    body: formData,
})
.then(res => res.json())
.then(data => console.log(data))

fetch('baseUrl/delete-product/:ProductId', {
    method: 'DELETE',
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
})