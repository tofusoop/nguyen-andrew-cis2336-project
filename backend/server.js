const express=require('express');
const multer=require('multer');
const path=require('path');
const cors=require('cors');
const app=express();
const PORT=process.env.PORT || 3000;
const artworkStore = [];


const storage=multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/uploads', express.static(path.join(__dirname,'uploads')));
app.get('/api/artworks', (req, res) => {
  res.status(200).json({
    success: true,
    count: artworkStore.length,
    data: artworkStore
  });
});


app.post('/api/artworks', upload.single('image'), (req, res) => {
  try {
    const { title,artist,artistemail,category,price,description } = req.body;
    if (!title || !artist || !artistemail || !category || !price || !description) {
      return res.status(400).json({ success: false, message: 'All form fields are required.' });
    }
    const newArtwork = {
      id: Date.now(),
      title,
      artist,
      artistemail,
      category,
      price: parseFloat(price),
      description,
      imagePath: req.file ? `/uploads/${req.file.filename}` : null,
      submittedAt: new Date().toISOString()
    };

    artworkStore.push(newArtwork);

    res.status(201).json({
      success: true,
      message:`Success! '${title}' has been submitted for review.`,
      artwork: newArtwork
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error processing artwork.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
