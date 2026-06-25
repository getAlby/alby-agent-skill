import { SimplePool, EventTemplate, Event, Relay } from 'nostr-tools';

type Nip47EncryptionType = "nip04" | "nip44_v2";
type NWCAuthorizationUrlOptions = {
    name?: string;
    icon?: string;
    requestMethods?: Nip47Method[];
    notificationTypes?: Nip47NotificationType[];
    returnTo?: string;
    expiresAt?: Date;
    maxAmount?: number;
    budgetRenewal?: "never" | "daily" | "weekly" | "monthly" | "yearly";
    isolated?: boolean;
    metadata?: unknown;
};
declare class Nip47Error extends Error {
    code: string;
    constructor(message: string, code: string);
}
declare class Nip47NetworkError extends Nip47Error {
}
/**
 * A NIP-47 response was received, but with an error code (see https://github.com/nostr-protocol/nips/blob/master/47.md#error-codes)
 */
declare class Nip47WalletError extends Nip47Error {
}
declare class Nip47TimeoutError extends Nip47Error {
}
declare class Nip47PublishTimeoutError extends Nip47TimeoutError {
}
declare class Nip47ReplyTimeoutError extends Nip47TimeoutError {
}
declare class Nip47PublishError extends Nip47Error {
}
declare class Nip47ResponseDecodingError extends Nip47Error {
}
declare class Nip47ResponseValidationError extends Nip47Error {
}
declare class Nip47UnexpectedResponseError extends Nip47Error {
}
declare class Nip47UnsupportedEncryptionError extends Nip47Error {
}
type WithDTag = {
    dTag: string;
};
type WithOptionalId = {
    id?: string;
};
type Nip47SingleMethod = "get_info" | "get_balance" | "get_budget" | "make_invoice" | "pay_invoice" | "pay_keysend" | "lookup_invoice" | "list_transactions" | "sign_message" | "create_connection" | "make_hold_invoice" | "settle_hold_invoice" | "cancel_hold_invoice";
type Nip47MultiMethod = "multi_pay_invoice" | "multi_pay_keysend";
type Nip47Method = Nip47SingleMethod | Nip47MultiMethod;
type Nip47Capability = Nip47Method | "notifications";
type BudgetRenewalPeriod = "daily" | "weekly" | "monthly" | "yearly" | "never";
type Nip47GetInfoResponse = {
    alias: string;
    color: string;
    pubkey: string;
    network: string;
    block_height: number;
    block_hash: string;
    methods: Nip47Method[];
    notifications?: Nip47NotificationType[];
    metadata?: unknown;
    lud16?: string;
};
type Nip47GetBudgetResponse = {
    used_budget: number;
    total_budget: number;
    renews_at?: number;
    renewal_period: BudgetRenewalPeriod;
} | {};
type Nip47GetBalanceResponse = {
    balance: number;
};
type Nip47PayResponse = {
    preimage: string;
    fees_paid: number;
};
type Nip47MultiPayInvoiceRequest = {
    invoices: (Nip47PayInvoiceRequest & WithOptionalId)[];
};
type Nip47MultiPayKeysendRequest = {
    keysends: (Nip47PayKeysendRequest & WithOptionalId)[];
};
type Nip47MultiPayInvoiceResponse = {
    invoices: ({
        invoice: Nip47PayInvoiceRequest;
    } & Nip47PayResponse & WithDTag)[];
    errors: [];
};
type Nip47MultiPayKeysendResponse = {
    keysends: ({
        keysend: Nip47PayKeysendRequest;
    } & Nip47PayResponse & WithDTag)[];
    errors: [];
};
interface Nip47ListTransactionsRequest {
    from?: number;
    until?: number;
    limit?: number;
    offset?: number;
    unpaid?: boolean;
    /**
     * NOTE: non-NIP-47 spec compliant
     */
    unpaid_outgoing?: boolean;
    /**
     * NOTE: non-NIP-47 spec compliant
     */
    unpaid_incoming?: boolean;
    type?: "incoming" | "outgoing";
}
type Nip47ListTransactionsResponse = {
    transactions: Nip47Transaction[];
    /**
     * NOTE: non-NIP-47 spec compliant
     */
    total_count: number;
};
type Nip47Transaction = {
    type: "incoming" | "outgoing";
    state: "settled" | "pending" | "failed" | "accepted";
    invoice: string;
    description: string;
    description_hash: string;
    preimage: string;
    payment_hash: string;
    amount: number;
    fees_paid: number;
    settled_at: number;
    created_at: number;
    expires_at: number;
    /**
     * NOTE: non-NIP-47 spec compliant
     */
    settle_deadline?: number;
    metadata?: Nip47TransactionMetadata;
};
type Nip47TransactionMetadata = {
    comment?: string;
    payer_data?: {
        email?: string;
        name?: string;
        pubkey?: string;
    };
    recipient_data?: {
        identifier?: string;
    };
    nostr?: {
        pubkey: string;
        tags: string[][];
    };
} & Record<string, unknown>;
type Nip47NotificationType = Nip47Notification["notification_type"];
type Nip47Notification = {
    notification_type: "payment_received";
    notification: Nip47Transaction;
} | {
    notification_type: "payment_sent";
    notification: Nip47Transaction;
} | {
    notification_type: "hold_invoice_accepted";
    notification: Nip47Transaction;
};
type Nip47PayInvoiceRequest = {
    invoice: string;
    metadata?: Nip47TransactionMetadata;
    amount?: number;
};
type Nip47PayKeysendRequest = {
    amount: number;
    pubkey: string;
    preimage?: string;
    tlv_records?: {
        type: number;
        value: string;
    }[];
};
type Nip47MakeInvoiceRequest = {
    amount: number;
    description?: string;
    description_hash?: string;
    expiry?: number;
    metadata?: Nip47TransactionMetadata;
};
type Nip47MakeHoldInvoiceRequest = Nip47MakeInvoiceRequest & {
    payment_hash: string;
};
type Nip47SettleHoldInvoiceRequest = {
    preimage: string;
};
type Nip47SettleHoldInvoiceResponse = {};
type Nip47CancelHoldInvoiceRequest = {
    payment_hash: string;
};
type Nip47CancelHoldInvoiceResponse = {};
type Nip47LookupInvoiceRequest = {
    payment_hash?: string;
    invoice?: string;
};
type Nip47SignMessageRequest = {
    message: string;
};
type Nip47CreateConnectionRequest = {
    pubkey: string;
    name: string;
    request_methods: Nip47Method[];
    notification_types?: Nip47NotificationType[];
    max_amount?: number;
    budget_renewal?: BudgetRenewalPeriod;
    expires_at?: number;
    isolated?: boolean;
    metadata?: unknown;
};
type Nip47CreateConnectionResponse = {
    wallet_pubkey: string;
};
type Nip47SignMessageResponse = {
    message: string;
    signature: string;
};
type Nip47TimeoutValues = {
    replyTimeout?: number;
    publishTimeout?: number;
};

interface NWCOptions {
    relayUrls: string[];
    walletPubkey: string;
    secret?: string;
    lud16?: string;
}
type NewNWCClientOptions = {
    relayUrls?: string[];
    secret?: string;
    walletPubkey?: string;
    nostrWalletConnectUrl?: string;
    lud16?: string;
};
declare class NWCClient {
    pool: SimplePool;
    relayUrls: string[];
    secret: string | undefined;
    lud16: string | undefined;
    walletPubkey: string;
    options: NWCOptions;
    private _encryptionType;
    static parseWalletConnectUrl(walletConnectUrl: string): NWCOptions;
    constructor(options?: NewNWCClientOptions);
    get nostrWalletConnectUrl(): string;
    getNostrWalletConnectUrl(includeSecret?: boolean): string;
    get connected(): boolean;
    get publicKey(): string;
    get encryptionType(): string;
    getPublicKey(): Promise<string>;
    signEvent(event: EventTemplate): Promise<Event>;
    getEventHash(event: Event): string;
    close(): void;
    encrypt(pubkey: string, content: string): Promise<any>;
    decrypt(pubkey: string, content: string): Promise<string>;
    static getAuthorizationUrl(authorizationBasePath: string, options: NWCAuthorizationUrlOptions | undefined, pubkey: string): URL;
    /**
     * create a new client-initiated NWC connection via HTTP deeplink
     *
     * @param authorizationBasePath the deeplink path e.g. https://my.albyhub.com/apps/new
     * @param options configure the created app (e.g. the name, budget, expiration)
     * @param secret optionally pass a secret, otherwise one will be generated.
     */
    static fromAuthorizationUrl(authorizationBasePath: string, options?: NWCAuthorizationUrlOptions, secret?: string): Promise<NWCClient>;
    getWalletServiceInfo(): Promise<{
        encryptions: string[];
        capabilities: Nip47Capability[];
        notifications: Nip47NotificationType[];
    }>;
    getInfo(): Promise<Nip47GetInfoResponse>;
    getBudget(): Promise<Nip47GetBudgetResponse>;
    getBalance(): Promise<Nip47GetBalanceResponse>;
    payInvoice(request: Nip47PayInvoiceRequest): Promise<Nip47PayResponse>;
    payKeysend(request: Nip47PayKeysendRequest): Promise<Nip47PayResponse>;
    signMessage(request: Nip47SignMessageRequest): Promise<Nip47SignMessageResponse>;
    createConnection(request: Nip47CreateConnectionRequest): Promise<Nip47CreateConnectionResponse>;
    multiPayInvoice(request: Nip47MultiPayInvoiceRequest): Promise<Nip47MultiPayInvoiceResponse>;
    multiPayKeysend(request: Nip47MultiPayKeysendRequest): Promise<Nip47MultiPayKeysendResponse>;
    makeInvoice(request: Nip47MakeInvoiceRequest): Promise<Nip47Transaction>;
    makeHoldInvoice(request: Nip47MakeHoldInvoiceRequest): Promise<Nip47Transaction>;
    settleHoldInvoice(request: Nip47SettleHoldInvoiceRequest): Promise<Nip47SettleHoldInvoiceResponse>;
    cancelHoldInvoice(request: Nip47CancelHoldInvoiceRequest): Promise<Nip47CancelHoldInvoiceResponse>;
    lookupInvoice(request: Nip47LookupInvoiceRequest): Promise<Nip47Transaction>;
    listTransactions(request: Nip47ListTransactionsRequest): Promise<Nip47ListTransactionsResponse>;
    subscribeNotifications(onNotification: (notification: Nip47Notification) => void, notificationTypes?: Nip47NotificationType[]): Promise<() => void>;
    private executeNip47Request;
    private executeMultiNip47Request;
    private _checkConnected;
    private _selectEncryptionType;
    private _findPreferredEncryptionType;
}

type NWAOptions = {
    relayUrls: string[];
    appPubkey: string;
    requestMethods: Nip47Method[];
    name?: string;
    icon?: string;
    notificationTypes?: Nip47NotificationType[];
    maxAmount?: number;
    budgetRenewal?: BudgetRenewalPeriod;
    expiresAt?: number;
    isolated?: boolean;
    returnTo?: string;
    metadata?: unknown;
};
type NewNWAClientOptions = Omit<NWAOptions, "appPubkey"> & {
    appSecretKey?: string;
};
declare class NWAClient {
    options: NWAOptions;
    appSecretKey: string;
    pool: SimplePool;
    constructor(options: NewNWAClientOptions);
    /**
     * returns the NWA connection URI which should be given to the wallet
     */
    get connectionUri(): string;
    /**
     * returns the NWA connection URI which should be given to the wallet
     * @param nwaSchemeSuffix open a specific wallet. e.g. "alby" will set the scheme to
     * nostr+walletauth+alby to ensure the link will be opened in an Alby wallet
     */
    getConnectionUri(nwaSchemeSuffix?: string): string;
    static parseWalletAuthUrl(walletAuthUrl: string): NWAOptions;
    /**
     * Waits for a new app connection to be created via NWA (https://github.com/nostr-protocol/nips/pull/851)
     *
     * @returns a new NWCClient
     */
    subscribe(args: {
        onSuccess: (nwcClient: NWCClient) => void;
    }): Promise<{
        unsub: () => void;
    }>;
    private _checkConnected;
}

type NWCWalletServiceRequestHandlerError = {
    code: string;
    message: string;
} | undefined;
type NWCWalletServiceResponse<T> = {
    result: T | undefined;
    error: NWCWalletServiceRequestHandlerError;
};
type NWCWalletServiceResponsePromise<T> = Promise<{
    result: T | undefined;
    error: NWCWalletServiceRequestHandlerError;
}>;
interface NWCWalletServiceRequestHandler {
    getInfo?(): NWCWalletServiceResponsePromise<Nip47GetInfoResponse>;
    makeInvoice?(request: Nip47MakeInvoiceRequest): NWCWalletServiceResponsePromise<Nip47Transaction>;
    payInvoice?(request: Nip47PayInvoiceRequest): NWCWalletServiceResponsePromise<Nip47PayResponse>;
    payKeysend?(request: Nip47PayKeysendRequest): NWCWalletServiceResponsePromise<Nip47Transaction>;
    getBalance?(): NWCWalletServiceResponsePromise<Nip47GetBalanceResponse>;
    lookupInvoice?(request: Nip47LookupInvoiceRequest): NWCWalletServiceResponsePromise<Nip47Transaction>;
    listTransactions?(request: Nip47ListTransactionsRequest): NWCWalletServiceResponsePromise<Nip47ListTransactionsResponse>;
    signMessage?(request: Nip47SignMessageRequest): NWCWalletServiceResponsePromise<Nip47SignMessageResponse>;
}

type NewNWCWalletServiceOptions = {
    relayUrl: string;
};
declare class NWCWalletServiceKeyPair {
    walletSecret: string;
    walletPubkey: string;
    clientPubkey: string;
    constructor(walletSecret: string, clientPubkey: string);
}
declare class NWCWalletService {
    relay: Relay;
    relayUrl: string;
    constructor(options: NewNWCWalletServiceOptions);
    publishWalletServiceInfoEvent(walletSecret: string, supportedMethods: Nip47SingleMethod[], supportedNotifications: Nip47NotificationType[]): Promise<void>;
    subscribe(keypair: NWCWalletServiceKeyPair, handler: NWCWalletServiceRequestHandler): Promise<() => void>;
    get connected(): boolean;
    signEvent(event: EventTemplate, secretKey: string): Promise<Event>;
    close(): void;
    encrypt(keypair: NWCWalletServiceKeyPair, content: string, encryptionType: Nip47EncryptionType): Promise<any>;
    decrypt(keypair: NWCWalletServiceKeyPair, content: string, encryptionType: Nip47EncryptionType): Promise<any>;
    private _checkConnected;
}

export { NWAClient, NWCClient, NWCWalletService, NWCWalletServiceKeyPair, Nip47Error, Nip47NetworkError, Nip47PublishError, Nip47PublishTimeoutError, Nip47ReplyTimeoutError, Nip47ResponseDecodingError, Nip47ResponseValidationError, Nip47TimeoutError, Nip47UnexpectedResponseError, Nip47UnsupportedEncryptionError, Nip47WalletError };
export type { BudgetRenewalPeriod, NWAOptions, NWCAuthorizationUrlOptions, NWCOptions, NWCWalletServiceRequestHandler, NWCWalletServiceRequestHandlerError, NWCWalletServiceResponse, NWCWalletServiceResponsePromise, NewNWAClientOptions, NewNWCClientOptions, NewNWCWalletServiceOptions, Nip47CancelHoldInvoiceRequest, Nip47CancelHoldInvoiceResponse, Nip47Capability, Nip47CreateConnectionRequest, Nip47CreateConnectionResponse, Nip47EncryptionType, Nip47GetBalanceResponse, Nip47GetBudgetResponse, Nip47GetInfoResponse, Nip47ListTransactionsRequest, Nip47ListTransactionsResponse, Nip47LookupInvoiceRequest, Nip47MakeHoldInvoiceRequest, Nip47MakeInvoiceRequest, Nip47Method, Nip47MultiMethod, Nip47MultiPayInvoiceRequest, Nip47MultiPayInvoiceResponse, Nip47MultiPayKeysendRequest, Nip47MultiPayKeysendResponse, Nip47Notification, Nip47NotificationType, Nip47PayInvoiceRequest, Nip47PayKeysendRequest, Nip47PayResponse, Nip47SettleHoldInvoiceRequest, Nip47SettleHoldInvoiceResponse, Nip47SignMessageRequest, Nip47SignMessageResponse, Nip47SingleMethod, Nip47TimeoutValues, Nip47Transaction, Nip47TransactionMetadata, WithDTag, WithOptionalId };
