import {
  PauseIcon,
  Pencil1Icon,
  PlayIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { Show } from '../../components/show';
import { Box, Flex, IconButton, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { getAudioByCategory } from '../../api/audio';
import { Skeletons } from '../../components/skeletons';
import { useAudioPlayerContext } from 'react-use-audio-player';
import { useEffect } from 'react';
import { Audio, AudioListResponse } from '../../api/interfaces/audio.types';
import { API_GATEWAY } from '../../api/api';
import useUser from '../../hooks/useUser';

type ContentProps = {
  categoryId: string;
  setActiveTrack: (params: Audio) => void;
  activeTrack: Audio;
};

export const Content = ({
  categoryId,
  setActiveTrack,
  activeTrack,
}: ContentProps) => {
  const { user } = useUser();
  const { data: { data } = {}, isSuccess } = useQuery<AudioListResponse>({
    queryKey: ['audios', categoryId],
    queryFn: () => getAudioByCategory(categoryId),
    staleTime: 1000 * 60 * 2,
  });

  const { togglePlayPause, load, isPlaying } = useAudioPlayerContext();

  const { audioFiles = [] } = data || {};

  useEffect(() => {
    if (isSuccess && !activeTrack && !isPlaying) {
      setActiveTrack(audioFiles[0]);
    }
  }, [isSuccess]);

  const handlePlay = (value: Audio) => {
    if (isPlaying && value.id === activeTrack?.id) {
      togglePlayPause();
      return;
    }
    load(`${API_GATEWAY}${value.filePath}?token=${user.token}`, {
      autoplay: true,
    });

    setActiveTrack(value);
  };

  return (
    <Show when={isSuccess} fallback={<Skeletons />}>
      {audioFiles.map((item) => {
        return (
          <Flex
            key={item.id}
            gap="3"
            align="center"
            className="flex-hover"
            p="2"
            pl="4"
            pr="4"
          >
            <IconButton
              onClick={() => handlePlay(item)}
              variant="ghost"
              radius="full"
            >
              <Show
                when={activeTrack?.id === item.id && isPlaying}
                fallback={<PlayIcon width="20" height="20" />}
              >
                <PauseIcon width="20" height="20" />
              </Show>
            </IconButton>
            <Box minWidth="100px" width="0" flexGrow="1">
              <Text as="div" weight="bold" truncate>
                {item.title}
              </Text>
              <Text as="div" size="1">
                {item.description} | {item.category.name}
              </Text>
            </Box>
            <Flex gap="3" align="center">
              <IconButton variant="ghost">
                <Pencil1Icon width="18" height="18" />
              </IconButton>

              <IconButton variant="ghost">
                <TrashIcon width="18" height="18" />
              </IconButton>
            </Flex>
          </Flex>
        );
      })}
    </Show>
  );
};
