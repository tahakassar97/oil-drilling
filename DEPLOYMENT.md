# Oil Drilling AI Platform - Deployment Guide

## 🚀 Overview

This is a comprehensive AI-powered platform for oil drilling companies to manage and analyze their well data. The platform includes:

- **Interactive Well Management**: Select and manage multiple wells
- **Data Visualization**: Real-time drilling data charts (Rock Composition, DT, GR)
- **File Upload & Processing**: Excel file parsing and data persistence
- **AI Chatbot**: Intelligent assistant for drilling data analysis
- **Responsive Design**: Works across desktop, tablet, and mobile devices

## 🏗️ Architecture

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Nx Monorepo** for scalable architecture

### Backend
- **Next.js API Routes** for serverless functions
- **Cloudinary** for file storage
- **Excel parsing** with XLSX library
- **AI Chatbot** with intelligent responses

### Libraries
- **UI Library**: Reusable components (`@oil-drilling/ui`)
- **API Library**: HTTP client and services (`@oil-drilling/api`)

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. **Fork the repository** to your GitHub account

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your forked repository

3. **Configure Environment Variables**:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
   NEXT_PUBLIC_CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Deploy**: Vercel will automatically deploy on every push to main branch

### Option 2: AWS Amplify

1. **Connect to AWS Amplify**:
   - Go to AWS Amplify Console
   - Click "New App" → "Host web app"
   - Connect your GitHub repository

2. **Configure Build Settings**:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

3. **Set Environment Variables** in Amplify Console

### Option 3: Netlify

1. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Set Environment Variables** in Site Settings

## 🔧 CI/CD Pipeline Configuration

### GitHub Actions (Already Configured)

The repository includes a complete CI/CD pipeline:

```yaml
# .github/workflows/deploy.yml
- Builds the project
- Runs tests and linting
- Deploys to Vercel automatically
- Triggers on push to main/master branches
```

### Required Secrets

Add these secrets to your GitHub repository:

1. **VERCEL_TOKEN**: Your Vercel API token
2. **ORG_ID**: Your Vercel organization ID
3. **PROJECT_ID**: Your Vercel project ID

### Manual Setup Steps

1. **Get Vercel Token**:
   - Go to Vercel Dashboard → Settings → Tokens
   - Create a new token

2. **Get Project IDs**:
   - Run `npx vercel` in your project
   - Note the Org ID and Project ID from the output

3. **Add Secrets to GitHub**:
   - Go to Repository → Settings → Secrets and Variables → Actions
   - Add the three secrets mentioned above

## 🗄️ Database Options

### Option 1: PostgreSQL with Supabase (Recommended)

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project

2. **Install Supabase Client**:
   ```bash
   npm install @supabase/supabase-js
   ```

3. **Configure Environment Variables**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Option 2: MongoDB with MongoDB Atlas

1. **Create MongoDB Atlas Cluster**:
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Create a free cluster

2. **Install MongoDB Driver**:
   ```bash
   npm install mongodb
   ```

3. **Configure Connection String**:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

### Option 3: AWS RDS (Production)

1. **Create RDS Instance**:
   - Go to AWS RDS Console
   - Create PostgreSQL or MySQL instance

2. **Configure Security Groups**:
   - Allow inbound connections on port 5432 (PostgreSQL) or 3306 (MySQL)

3. **Set Environment Variables**:
   ```env
   DATABASE_URL=postgresql://username:password@host:port/database
   ```

## 🤖 AI Integration Options

### Option 1: OpenAI (Recommended)

1. **Get OpenAI API Key**:
   - Go to [platform.openai.com](https://platform.openai.com)
   - Create API key

2. **Update Chat API**:
   ```typescript
   // apps/oil-drilling/src/app/api/chat/route.ts
   const response = await fetch('https://api.openai.com/v1/chat/completions', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       model: 'gpt-3.5-turbo',
       messages: [{ role: 'user', content: message }],
     }),
   });
   ```

3. **Set Environment Variable**:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   ```

### Option 2: AWS Bedrock

1. **Enable Bedrock Service**:
   - Go to AWS Bedrock Console
   - Enable the service for your region

2. **Configure IAM Permissions**:
   - Create IAM role with Bedrock access
   - Attach to your Lambda/ECS task

3. **Update Chat API** to use Bedrock SDK

### Option 3: Anthropic Claude

1. **Get Claude API Key**:
   - Go to [console.anthropic.com](https://console.anthropic.com)
   - Create API key

2. **Install Claude SDK**:
   ```bash
   npm install @anthropic-ai/sdk
   ```

3. **Update Chat API** to use Claude

## 📊 Monitoring and Analytics

### Option 1: Vercel Analytics

- Built-in analytics with Vercel deployment
- Real-time performance monitoring
- User behavior tracking

### Option 2: AWS CloudWatch

- Application logs and metrics
- Custom dashboards
- Alerting and notifications

### Option 3: Google Analytics

- User engagement tracking
- Performance insights
- Custom event tracking

## 🔒 Security Considerations

1. **Environment Variables**:
   - Never commit secrets to repository
   - Use different values for dev/staging/prod

2. **API Security**:
   - Implement rate limiting
   - Add authentication middleware
   - Validate all inputs

3. **File Upload Security**:
   - Validate file types and sizes
   - Scan for malware
   - Use secure file storage

## 🚀 Quick Start

1. **Clone and Install**:
   ```bash
   git clone <your-repo-url>
   cd oil-drilling
   npm install
   ```

2. **Set Environment Variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## 📈 Performance Optimization

1. **Image Optimization**:
   - Use Next.js Image component
   - Implement lazy loading
   - Optimize file sizes

2. **Code Splitting**:
   - Dynamic imports for heavy components
   - Route-based code splitting
   - Library optimization

3. **Caching**:
   - Implement Redis for session storage
   - Use CDN for static assets
   - Browser caching strategies

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment Variables**:
   - Ensure all required variables are set
   - Check variable names and values
   - Verify deployment platform configuration

3. **File Upload Issues**:
   - Check Cloudinary configuration
   - Verify file size limits
   - Check CORS settings

### Support

- Check the GitHub Issues page
- Review the documentation
- Contact the development team

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
