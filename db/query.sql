SELECT book_name, price
FROM favorite_books
JOIN book_prices ON favorite_books.book_prices = book_prices.id;