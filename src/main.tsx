import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { RadioStreamProvider } from './providers/streamAudio'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <RadioStreamProvider>
      <App />
    </RadioStreamProvider>
  </ChakraProvider>
)
