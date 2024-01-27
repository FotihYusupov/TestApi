fetch('baseUrl/delete-admin/:UserId', {
    method: "DELETE",
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
})
.then(res => res.json())
.then(data => console.log(data))

fetch('baseUrl/add-category', {
    method: "POST",
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
        categoryNameUz: 'category name uz',
        categoryNameEn: 'category name en',
        categoryNameKr: 'category name kr',
        categoryNameRu: 'category name ru'
    }),
})
.then(res => res.json())
.then(data => console.log(data))

fetch('baseUrl/delete-category/:categoryId', {
    method: 'DELETE',
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
})