# DocuMind AI

Your intelligent document assistant for study and research. Upload PDFs, chat with your documents, and unlock insights from your knowledge base with AI-powered analysis.

## Features

- **AI Chat Assistant**: Intelligent conversations with advanced language models
- **Document Upload**: Process PDF documents for AI analysis (Premium/Admin only)
- **Role-Based Authentication**: User, Premium, and Admin access levels
- **Smart Search**: Vector-based document search with semantic understanding
- **Beautiful UI**: Modern educational design with glassmorphism effects
- **Responsive Design**: Perfect experience on desktop, tablet, and mobile

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Authentication**: Clerk with role-based access control
- **AI**: OpenAI GPT models with AI SDK
- **Database**: PostgreSQL with Neon and pgvector
- **ORM**: Drizzle ORM
- **Styling**: Tailwind CSS with custom educational theme
- **Icons**: Lucide React
- **PDF Processing**: pdf-parse for text extraction

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon recommended)
- OpenAI API key
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd docu-mind-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file with:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key

   # Database
   DATABASE_URL=your_postgresql_connection_string
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## User Roles

- **User**: Access to AI chat functionality
- **Premium User**: Chat + PDF document upload capabilities  
- **Admin**: Full access to all features

Set user roles in Clerk dashboard under "Public metadata":
```json
{
  "role": "premium-user"
}
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/chat/          # Chat API endpoint
│   ├── chat/              # Chat interface
│   ├── profile/           # User profile management
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ai-elements/       # AI chat UI components
│   ├── ui/               # Reusable UI components
│   ├── navigation.tsx     # Navigation bar
│   └── footer.tsx        # Footer component
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── auth-utils.ts     # Authentication helpers
│   ├── db-config.ts      # Database configuration
│   ├── embeddings.ts     # Vector embedding utilities
│   └── search.ts         # Document search functionality
└── types/                # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
