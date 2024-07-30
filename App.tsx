/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Platform,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {
  Taboola,
  TBL_PLACEMENT_TYPE,
  TBLClassicUnit,
  useNodeRef,
  useGetPageId,
} from '@taboola/react-native-plugin-3x';
// import RNTaboolaView from '@taboola/react-native-taboola';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const publisher = Platform.OS === 'android' ? 'atime-android' : 'atime-ios';
  Taboola.init(publisher);
  const page = useMemo(
    () => Taboola.getClassicPage('https://atime.live/efm', 'article'),
    [],
  );
  const [pageId] = useGetPageId(page);
  page.setUserId('daniel');

  const [setUnitRef2] = useNodeRef(unit => {
    unit.fetchContent();
  });

  useEffect(() => {
    return () => {
      page.remove();
    };
  }, [page]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // {
  //   extraProperties = {},
  //   mode = 'thumbnails-a-1x1',
  //   pageType = 'article',
  //   pageUrl = 'https://atime.live',
  //   placement = 'Below Article Thumbnails 1x1',
  //   targetType = 'mix',
  //   onDidLoad = () => {},
  // }
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <TBLClassicUnit
          ref={setUnitRef2}
          publisherParams={{
            classicPageId: pageId,
            placement: 'Below Article Thumbnails 1x1',
            mode: 'thumbnails-a-1x1',
            placementType: TBL_PLACEMENT_TYPE.PAGE_BOTTOM,
          }}
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            flex: 1,
          }}
        />
        {/* <RNTaboolaView
          viewID={props.viewID}
          mode={props.mode}
          publisher={publisher}
          pageType={props.pageType}
          pageUrl={props.pageUrl}
          placement={props.placement}
          targetType={props.targetType}
          interceptScroll={true}
          extraProperties={props.extraProperties}
          style={{height, width: '100%', fontFamily: 'DB HelvethaicaMon X'}}
          onDidLoad={(event: any) => {
            // This lets us implement other logic into this callback via props
            if (props.onDidLoad) {
              props.onDidLoad(event);
            }
            setHeight(parseInt(event.nativeEvent.height, 10));
          }}
          onDidFailToLoad={event => {
            // collapse the taboola view if content fails to load
            setHeight(0);
          }}
          onItemClick={event => {}}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
