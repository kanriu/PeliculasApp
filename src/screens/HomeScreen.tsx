import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, Dimensions, View, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MoviePoster} from '../components/MoviePoster';
import {useMovies} from '../hooks/useMovies';
import Carousel from 'react-native-reanimated-carousel';
import {HorizontalSlider} from '../components/HorizontalSlider';
import {GradientBackground} from '../components/GradientBackground';

import {getImageColors} from '../helpers/getColores';
import {GradientContext} from '../context/GradientContext';
const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();
  const {setMainColors} = useContext(GradientContext);

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const {primary = 'green', secondary = 'orange'} = await getImageColors(uri);
    setMainColors({primary, secondary});
  };

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColors(0);
    }
  }, [nowPlaying]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator color={'red'} size={100} />
      </View>
    );
  }

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{marginTop: top}}>
          <View style={{height: 440}}>
            <Carousel
              // Just one of the many styles from the Carousel module
              mode="parallax"
              // This style prop regards to the carousel container not to the item itself
              style={{width: windowWidth, justifyContent: 'center'}}
              // Paging in false allows to do superfast scroll
              pagingEnabled={false}
              // and that superfast scroll stops on multiples of windowSize
              windowSize={2}
              // the snap helps to stop exactly in 1 item, no in the middle of two or so
              snapEnabled
              // This props are for the item in the middle
              width={300}
              height={430}
              modeConfig={{
                // How the "main" item will look
                parallaxScrollingScale: 0.9,
                // How separate the adjacent items will be
                parallaxScrollingOffset: 40,
                // How big the adjacent items will look compared to the "main" item
                parallaxAdjacentItemScale: 0.75,
              }}
              data={nowPlaying}
              renderItem={({item}) => <MoviePoster movie={item} />}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>
          <HorizontalSlider title={'Popular'} movies={popular} />
          <HorizontalSlider title={'Top Rated'} movies={topRated} />
          <HorizontalSlider title={'Upcoming'} movies={upcoming} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
