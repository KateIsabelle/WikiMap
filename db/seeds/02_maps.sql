CREATE TABLE maps {
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(255) NOT NULL,
  zoom INTEGER DEFAULT 8,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
}

INSERT INTO maps (
  title, description, image, zoom, latitude, longitude, created_at, user_id)
VALUES ('Richmond Hill David Dunlap Observatory', 'Amazing Observatory', 'https://lh5.googleusercontent.com/p/AF1QipMWdRMfioqVwGVCzXO8EmfBnKWq1Dc0tnJlJO0A=w408-h272-k-no', 8, 43.87280154289223, -79.41835476889356, 1),
('Art Gallery of Ontario', 'https://lh5.googleusercontent.com/p/AF1QipOeaWXCIFcdINu6aLr3HKrfoMi-Ls0ZZTkkdFmZ=w408-h272-k-no', 'Beautiful art gallery', 8, 43.674210974349734, -79.38770940343746, 1),
('Toronto Zoo', 'Amazing zoo', 'https://lh5.googleusercontent.com/p/AF1QipONoMdBjU1H8GgTMzOEf7FScPWYHbGVJgUTIZe-=w426-h240-k-no', 8, 43.83205591833985, -79.17944776355344, '2018-02-12T08:00:00.000Z', 1),
('Aga Khan Museum', 'Beautiful museum', 'https://lh5.googleusercontent.com/p/AF1QipNdvM0btDdrpD4zfpsfz1F9hrw4FWvE_9TulXjq=w411-h240-k-no', 8, 43.750642502534205, -79.33141119181376, 2),
('Toronto Pearson International Airport', 'Beautiful airport', 'https://lh5.googleusercontent.com/p/AF1QipOvLwiFt774uzeOoVLmfYy_jRfAhHea8m8YjOtH=w426-h240-k-no', 8, 43.6878320628197, -79.62724536368336, 2);

