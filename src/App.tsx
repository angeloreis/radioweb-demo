import { Button, Flex, Heading, Select, Text } from '@chakra-ui/react'
import { FaVolumeDown, FaVolumeUp, FaVolumeMute, FaPlay, FaStop } from 'react-icons/fa'
import { useRadioPlayedContext } from './providers/streamAudio'
import { useState } from 'react'


function App() {

  const radioStreaming = {
    oliberal: 'http://177.105.192.70:9750/liberalfm.mp3',
    rcpa: 'https://ice01.kshost.com.br:8000/live',
    cbnAmazonia: 'https://stream2.cbnamazonia.com.br/cbn-blm',
    rauland: 'https://stm1.srvif.com:6672/stream',
    kissFM: 'https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO_KISSFMAAC.aac',
    comunix: 'https://s08.w3bserver.com/radio/8240/radio.mp3'
  }

  const [ disableButton, setDisableButton ] = useState(true)

  const {
    handleStreaming,
    loading,
    played,
    onStart,
    onStop,
    volumeMinus,
    volumePlus,
    muteAudio } = useRadioPlayedContext()

  const sizeIcons = 24

  const handleDataStream = (radio: string) => {
    played && onStop()
    handleStreaming(radio)
    setDisableButton(false)
  }

  return (
    <Flex
      background="blackAlpha.900"
      width="100vw"
      height="100vh"
      align="center"
      justify="center"
      color="white"
    >

      <Flex
        alignItems='center'
        justifyContent="center"
        flexDir='column'
        minW="310px"
        maxW="480px"
        padding="10px"
      >
        <Heading paddingY="15px" size={['md', 'lg']}>Escolha sua estação de rádio</Heading>
        {loading ? <Text>Aguarde...</Text> : <></>}
        <Flex
          padding="10px"
          borderColor="white"
          border="1px"
          borderRadius="5px"
          minW="310px"
          maxW="480px"
          w="100%">
          <Select
            color="whiteAlpha.900"
            minW="300px"
            maxW="480px"
            placeholder='Selecione uma estação de rádio...'
            size={['sm', 'md', 'lg']}
            variant='unstyled'
            onChange={(e) => handleDataStream(e.target.value)}>
            <option value={radioStreaming.oliberal}>O liberal - Belém</option>
            <option value={radioStreaming.rcpa}>Rádio Clube do Para - 690</option>
            <option value={radioStreaming.cbnAmazonia}>CBN - Amazônia</option>
            <option value={radioStreaming.rauland}>Rauland 95.1 FM</option>
            <option value={radioStreaming.kissFM}>Kiss 92.5 FM</option>
            <option value={radioStreaming.comunix}>Comunix Web</option>
          </Select>
        </Flex>


        <Flex alignItems='center' justifyContent='space-between' gap="10px">
          <Flex
            flexDir='row'
            alignItems='center'
            justifyContent='space-between'
            gap="10px"
            paddingY="16px">
            <Button disabled={disableButton} onClick={() => volumeMinus()}>
              <FaVolumeDown size={sizeIcons} color="black" />
            </Button>
            <Button disabled={disableButton} onClick={() => !played ? onStart() : onStop()}>
              {!played ? <FaPlay size={sizeIcons} color="black" /> : <FaStop size={sizeIcons} color="black" />}
            </Button>
            <Button disabled={disableButton} onClick={() => volumePlus()}>
              <FaVolumeUp size={sizeIcons} color="black" />
            </Button>
            <Button disabled={disableButton} onClick={() => muteAudio()}>
              <FaVolumeMute size={sizeIcons} color="black" />
            </Button>
          </Flex>
        </Flex>

      </Flex>

    </Flex>
  )
}

export default App
