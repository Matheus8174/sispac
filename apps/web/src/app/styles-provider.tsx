'use client';

import { StyleSheet } from 'react-native';
import { useServerInsertedHTML } from 'next/navigation';

function StylesProvider({ children }: React.PropsWithChildren) {
  useServerInsertedHTML(() => {
    // @ts-ignore
    const sheet = StyleSheet.getSheet();
    return (
      <style
        dangerouslySetInnerHTML={{ __html: sheet.textContent }}
        id={sheet.id}
      />
    );
  });

  return children;
}

export default StylesProvider;
