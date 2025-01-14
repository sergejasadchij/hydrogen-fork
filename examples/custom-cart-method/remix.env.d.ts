/// <reference types="@remix-run/dev" />
/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

import type {
  Storefront,
  CustomerAccount,
  HydrogenCart,
  HydrogenCartCustom,
  CartQueryDataReturn,
} from '@shopify/hydrogen';
import type {
  SelectedOptionInput,
  CartLineUpdateInput,
} from '@shopify/hydrogen/storefront-api-types';
import type {AppSession} from '~/lib/session';

declare global {
  /**
   * A global `process` object is only available during build to access NODE_ENV.
   */
  const process: {env: {NODE_ENV: 'production' | 'development'}};

  /**
   * Declare expected Env parameter in fetch handler.
   */
  interface Env {
    SESSION_SECRET: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    PRIVATE_STOREFRONT_API_TOKEN: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_ID: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_URL: string;
  }
}

declare module '@shopify/remix-oxygen' {
  /**
   * Declare local additions to the Remix loader context.
   */
  export interface AppLoadContext {
    env: Env;
    /***********************************************/
    /**********  EXAMPLE UPDATE STARTS  ************/
    cart: HydrogenCartCustom<{
      updateLineByOptions: (
        productId: string,
        selectedOptions: SelectedOptionInput[],
        line: CartLineUpdateInput,
      ) => Promise<CartQueryDataReturn>;
    }>;
    /**********   EXAMPLE UPDATE END   ************/
    /***********************************************/
    storefront: Storefront;
    customerAccount: CustomerAccount;
    session: AppSession;
    waitUntil: ExecutionContext['waitUntil'];
  }
}
