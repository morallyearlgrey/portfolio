"use client";

import React from 'react';
import {
  NewsKitProvider,
  newskitLightTheme,
  StyledPage,
  AudioPlayerComposable,
  GridLayout,
  AudioPlayerPlayPauseButton,
  AudioPlayerTimeDisplay,
  AudioPlayerVolumeControl,
  AudioPlayerSeekBar,
  Heading
} from 'newskit';

export default function Audioplayer() {
  return (
    <NewsKitProvider theme={newskitLightTheme}>
      <StyledPage>
        <div className="ready" />
        <Heading level="2">Audio Player - initial prop</Heading>

        <AudioPlayerComposable
          src="/fashion-upbeat-dance-designer-416395.mp3"
          initialTime={50}
          initialVolume={0.2}
        >
          <GridLayout
            columns={{ xs: '1fr auto auto auto 1fr', md: '50px 1fr auto auto auto 1fr 50px' }}
            rowGap="space040"
            columnGap="space040"
          >
            {Areas => (
              <>
                <Areas.Play alignSelf="center">
                  <AudioPlayerPlayPauseButton />
                </Areas.Play>

                <Areas.Volume alignSelf="center" justifySelf="start">
                  <AudioPlayerVolumeControl layout="collapsed" />
                </Areas.Volume>

                <Areas.SeekBar>
                  <AudioPlayerSeekBar />
                </Areas.SeekBar>

                <Areas.CurrentTime>
                  <AudioPlayerTimeDisplay />
                </Areas.CurrentTime>

                <Areas.TotalTime justifySelf="end">
                  <AudioPlayerTimeDisplay />
                </Areas.TotalTime>
              </>
            )}
          </GridLayout>
        </AudioPlayerComposable>
      </StyledPage>
    </NewsKitProvider>
  );
}
