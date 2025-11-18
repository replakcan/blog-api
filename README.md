# Blog API

Modern bir blog platformu için RESTful API ve React tabanlı frontend uygulaması. Kullanıcılar blog yazıları oluşturabilir, yorum yapabilir ve içerikleri yönetebilir.

## 📋 İçindekiler

- [Özellikler](#özellikler)
- [Teknolojiler](#teknolojiler)
- [Proje Yapısı](#proje-yapısı)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [API Endpoints](#api-endpoints)
- [Geliştirme](#geliştirme)

## ✨ Özellikler

### Kullanıcı Yönetimi
- ✅ Kullanıcı kaydı ve girişi
- ✅ JWT tabanlı kimlik doğrulama (RS256 algoritması)
- ✅ Rol tabanlı yetkilendirme sistemi
- ✅ Kullanıcı profilleri ve yetkilendirme yönetimi

### Blog Yazıları
- ✅ Blog yazıları oluşturma, düzenleme ve silme
- ✅ Yazı yayınlama durumu kontrolü (published/unpublished)
- ✅ Yazar bazlı yazı filtreleme
- ✅ Yazı detayları ve yorumlar

### Yorum Sistemi
- ✅ Postlara yorum ekleme
- ✅ Yorum görüntüleme ve yönetimi
- ✅ Kullanıcı bazlı yorum filtreleme

### Yetkilendirme
- ✅ JWT token tabanlı güvenli erişim
- ✅ Yazar yetkisi kontrolü
- ✅ Post sahipliği kontrolü
- ✅ Rol bazlı erişim kontrolü (READER, AUTHOR, ADMIN, MODERATOR, BANNED)

## 🛠 Teknolojiler

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Prisma ORM** - Veritabanı ORM
- **PostgreSQL** - İlişkisel veritabanı
- **Passport.js** - Kimlik doğrulama middleware
- **JWT (JSON Web Token)** - Token tabanlı kimlik doğrulama
- **bcryptjs** - Şifre hashleme
- **express-validator** - Veri doğrulama

### Frontend
- **React 19** - UI kütüphanesi
- **Vite** - Build tool ve dev server
- **React Router DOM** - Sayfa yönlendirme
- **Axios** - HTTP client
- **TinyMCE React** - Zengin metin editörü
- **Lucide React** - İkon kütüphanesi

## 📁 Proje Yapısı

```
blog-api/
├── backend/                 # Backend API
│   ├── app.js              # Ana Express uygulaması
│   ├── auth/               # Kimlik doğrulama modülleri
│   │   ├── generateToken.js
│   │   ├── isAuth.js
│   │   └── jwtStrategy.js
│   ├── controllers/        # Route controller'ları
│   │   ├── authorController.js
│   │   ├── commentsController.js
│   │   ├── indexController.js
│   │   ├── postsController.js
│   │   └── usersController.js
│   ├── errors/             # Özel hata sınıfları
│   │   └── customError.js
│   ├── lib/                # Yardımcı kütüphaneler
│   │   └── prisma.js
│   ├── prisma/             # Prisma şema ve migration'lar
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── routes/             # API route tanımları
│       ├── authorRouter.js
│       ├── commentsRouter.js
│       ├── indexRouter.js
│       ├── isAuthorMiddleware.js
│       ├── postsRouter.js
│       └── usersRouter.js
│
└── frontend/               # Frontend React uygulaması
    ├── src/
    │   ├── api/            # API client
    │   │   └── axiosInstance.js
    │   ├── components/     # React bileşenleri
    │   │   ├── author-card.jsx
    │   │   ├── card.jsx
    │   │   ├── comment-card.jsx
    │   │   ├── header-link.jsx
    │   │   ├── post-card.jsx
    │   │   └── root-header.jsx
    │   ├── hooks/          # Custom React hooks
    │   │   └── useLocalStorage.jsx
    │   ├── routes/         # Sayfa bileşenleri
    │   │   ├── author-details.jsx
    │   │   ├── author-posts.jsx
    │   │   ├── author-comments.jsx
    │   │   ├── home-page.jsx
    │   │   ├── login-page.jsx
    │   │   ├── new-post-form.jsx
    │   │   ├── post-details.jsx
    │   │   ├── register-page.jsx
    │   │   ├── user-profile.jsx
    │   │   ├── user-posts.jsx
    │   │   └── user-comments.jsx
    │   ├── styles/         # CSS dosyaları
    │   ├── routes.jsx      # Route tanımları
    │   ├── user-context.jsx # Context API
    │   └── main.jsx        # Giriş noktası
    └── vite.config.js
```

## 🚀 Kurulum

### Gereksinimler
- Node.js (v18 veya üzeri)
- PostgreSQL veritabanı
- npm veya yarn

### Backend Kurulumu

1. Backend dizinine gidin:
```bash
cd backend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyası oluşturun ve gerekli değişkenleri ekleyin:
```env
DATABASE_URL="postgresql://kullanici:sifre@localhost:5432/blog_db"
PORT=3000
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
```

4. Veritabanı migration'larını çalıştırın:
```bash
npx prisma migrate deploy
```

5. Prisma Client'ı oluşturun:
```bash
npx prisma generate
```

6. Sunucuyu başlatın:
```bash
npm start
```

Backend API `http://localhost:3000` adresinde çalışacaktır.

### Frontend Kurulumu

1. Frontend dizinine gidin:
```bash
cd frontend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Frontend uygulaması `http://localhost:5173` adresinde çalışacaktır.

## 📖 Kullanım

### Veritabanı Şeması

Proje aşağıdaki ana modelleri içerir:

- **User**: Kullanıcı bilgileri (id, first_name, last_name, username, email, age, password, role)
- **Post**: Blog yazıları (id, title, text, published, createdAt, updatedAt, userId)
- **Comment**: Yorumlar (id, text, createdAt, updatedAt, userId, postId)

### Roller

- **READER**: Varsayılan rol, yazı okuyabilir ve yorum yapabilir
- **AUTHOR**: Blog yazıları oluşturabilir ve kendi yazılarını yönetebilir
- **ADMIN**: Tüm yetkilere sahip
- **MODERATOR**: İçerik moderasyonu yapabilir
- **BANNED**: Erişim engellenmiş kullanıcı

## 🔌 API Endpoints

### Kimlik Doğrulama (`/`)
- `POST /login` - Kullanıcı girişi
- `POST /register` - Kullanıcı kaydı
- `GET /verify` - Mevcut kullanıcıyı doğrula (Auth gerekli)
- `GET /secret` - Test endpoint (Auth gerekli)
- `GET /users` - Tüm kullanıcıları listele (Auth gerekli)

### Yazılar (`/posts`)
- `GET /posts` - Tüm yazıları listele
- `GET /posts/:postId` - Belirli bir yazıyı getir
- `PUT /posts/:postId` - Yazıyı güncelle (Auth + Yazar yetkisi gerekli)
- `DELETE /posts/:postId` - Yazıyı sil (Auth + Yazar yetkisi gerekli)
- `PATCH /posts/:postId/publish` - Yazıyı yayınla (Auth + Yazar yetkisi gerekli)
- `GET /posts/:postId/comments` - Yazının yorumlarını getir
- `POST /posts/:postId/comments` - Yazıya yorum ekle (Auth gerekli)

### Yorumlar (`/comments`)
- `GET /comments/:commentId` - Belirli bir yorumu getir
- `PUT /comments/:commentId` - Yorumu güncelle (Auth + Yazar yetkisi gerekli)
- `DELETE /comments/:commentId` - Yorumu sil (Auth + Yazar yetkisi gerekli)

### Yazar (`/author`)
- `POST /author/posts` - Yeni yazı oluştur (Auth gerekli)
- `GET /author/:authorId` - Yazar profilini getir
- `GET /author/:authorId/posts` - Yazarın yazılarını getir
- `GET /author/:authorId/comments` - Yazarın yorumlarını getir

### Kullanıcılar (`/users`)
- `PUT /users/:userId/authorship` - Kullanıcıya yazar yetkisi ver (Auth gerekli)

## 🛠 Geliştirme

### Backend Geliştirme

```bash
cd backend
npm start
```

### Frontend Geliştirme

```bash
cd frontend
npm run dev
```

### Production Build

Frontend için production build oluşturma:
```bash
cd frontend
npm run build
```

Build çıktısı `frontend/dist` dizininde oluşturulacaktır.

### Veritabanı Yönetimi

Prisma Studio ile veritabanını görselleştirin:
```bash
cd backend
npx prisma studio
```

Yeni migration oluşturma:
```bash
cd backend
npx prisma migrate dev --name migration_adi
```

## 📝 Notlar

- JWT token'lar RS256 algoritması kullanarak imzalanır
- Şifreler bcryptjs ile hashlenir
- CORS tüm origin'lere açıktır (production'da kısıtlanmalıdır)
- Frontend, Railway üzerinde deploy edilmiş bir API'ye bağlanır (axiosInstance.js içinde tanımlı)

## 👤 Yazar

**Alper Mutlu Akcan** - alper.makcan@gmail.com

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
