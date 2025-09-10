import {
  Box,
  Card,
  Flex,
  Heading,
  IconButton,
  Tabs,
  Text,
} from '@radix-ui/themes';
import {
  PauseIcon,
  PlayIcon,
  SpeakerLoudIcon,
  TrackNextIcon,
  TrackPreviousIcon,
} from '@radix-ui/react-icons';
import { useState } from 'react';
import { Content } from './content';
import { useAudioPlayerContext } from 'react-use-audio-player';
import { Show } from '../../components/show';
import { Audio } from '../../api/interfaces/audio.types';
import { Nullable } from '../../helpers/types';
import { API_GATEWAY } from '../../api/api';
import { useCategory } from '../../hooks/useCategory';

import './audio.css';
import useUser from '../../hooks/useUser';

export default function AudioList() {
  const [activeTab, setActiveTab] = useState('');
  const { togglePlayPause, load, isPlaying } = useAudioPlayerContext();
  const [activeTrack, setActiveTrack] = useState<Nullable<Audio>>();
  const { user } = useUser();

  const { categories } = useCategory();

  if (categories && categories?.length > 0 && !activeTab) {
    setActiveTab(categories[0].id);
  }

  const handleSetActiveTrack = (audio: Audio) => {
    setActiveTrack(audio);
  };

  const handleValueChange = (value: string) => {
    setActiveTab(value);
  };

  const handlePlay = async () => {
    if (isPlaying) {
      togglePlayPause();
      return;
    }

    load(`${API_GATEWAY}${activeTrack?.filePath}?token=${user.token}`, {
      autoplay: true,
    });
  };

  return (
    <Box>
      <Card
        variant="surface"
        style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
      >
        <Box
          p="3"
          style={{
            position: 'relative',
            boxShadow: 'var(--shadow-3)',
          }}
        >
          <Flex
            direction={{ initial: 'column', xs: 'column', sm: 'row' }}
            justify="between"
          >
            <Box>
              <Heading>{activeTrack?.title}</Heading>
              <Text>{activeTrack?.description}</Text>
            </Box>
            <Flex
              align="center"
              gap="2"
              pt="3"
              pb="3"
              pl="5"
              pr="5"
              style={{
                background: 'var(--gray-a3)',
                borderRadius: 'var(--radius-5)',
              }}
              width={{
                initial: '50%',
                sm: 'auto',
              }}
            >
              <IconButton
                size="4"
                radius="full"
                variant="soft"
                onClick={handlePlay}
              >
                <Show
                  when={!isPlaying}
                  fallback={<PauseIcon width="30" height="30" />}
                >
                  <PlayIcon width="30" height="30" />
                </Show>
              </IconButton>

              <IconButton variant="ghost" ml="2">
                <TrackPreviousIcon width="20" height="20" />
              </IconButton>

              <IconButton variant="ghost">
                <TrackNextIcon width="20" height="20" />
              </IconButton>

              <IconButton variant="ghost" ml="2">
                <SpeakerLoudIcon width="20" height="20" />
              </IconButton>
            </Flex>
          </Flex>
        </Box>

        <Flex direction="column">
          <Flex direction="column" gap="1" p="2" width="100%">
            {categories && categories.length > 0 && (
              <Tabs.Root onValueChange={handleValueChange} value={activeTab}>
                <Tabs.List>
                  {categories.map((item) => {
                    return (
                      <Tabs.Trigger value={item.id}>{item.name}</Tabs.Trigger>
                    );
                  })}
                </Tabs.List>
                <Tabs.Content value={activeTab}>
                  <Content
                    categoryId={activeTab}
                    setActiveTrack={handleSetActiveTrack}
                    activeTrack={activeTrack as Audio}
                  />
                </Tabs.Content>
              </Tabs.Root>
            )}
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
