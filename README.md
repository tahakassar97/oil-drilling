# Oil Drilling AI Intelligence Platform

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

An intelligent AI-powered platform for oil and gas drilling data analysis, featuring real-time data visualization, AI chatbot assistance, and comprehensive well monitoring capabilities.

## Features

- **Well Data Visualization**: Interactive charts showing rock composition, DT (Delta-T), and GR (Gamma Ray) data
- **AI Chatbot Integration**: OpenAI-powered assistant for drilling data analysis and interpretation
- **File Upload & Processing**: Excel file upload with automatic data parsing and visualization
- **Responsive Design**: Works across desktop, tablet, and mobile devices
- **Real-time Analysis**: Dynamic data processing and visualization

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key (for AI chatbot features)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the `apps/oil-drilling` directory:
   ```env
   # OpenAI API Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Cloudinary Configuration (for file uploads)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
   NEXT_PUBLIC_CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the development server:
   ```bash
   npx nx dev oil-drilling
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Uploading Data
1. Click the "Upload" button
2. Select an Excel file with drilling data
3. The system will automatically parse and visualize the data

### AI Chatbot
1. Use the chatbot on the right side to ask questions about your drilling data
2. Ask about rock composition, DT/GR values, or drilling parameters
3. The AI will provide technical insights based on your uploaded data

### Data Visualization
- **Rock Composition**: Stacked area chart showing percentage of different rock types
- **DT (Delta-T)**: Line chart showing sonic transit time measurements
- **GR (Gamma Ray)**: Line chart showing natural radioactivity measurements

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/MwPy82K5EZ)


## Run tasks

To run the dev server for your app, use:

```sh
npx nx dev oil-drilling
```

To create a production bundle:

```sh
npx nx build oil-drilling
```

To see all available targets to run for a project, run:

```sh
npx nx show project oil-drilling
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/next:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/next?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
