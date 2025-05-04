import * as hono_hono_base from 'hono/hono-base';
import * as hono_types from 'hono/types';
import * as hono_utils_http_status from 'hono/utils/http-status';
import * as kysely from 'kysely';
import * as better_auth from 'better-auth';
import { User, Session, Account, Verification } from 'better-auth';

type IssueStatus = "backlog" | "todo" | "in_progress" | "in_review" | "done" | "canceled" | "duplicate";
type IssuePriority = "no_priority" | "urgent" | "high" | "medium" | "low";
type Issue = {
    id: string;
    title: string;
    description: string;
    status: IssueStatus;
    priority: IssuePriority;
    teamId: string;
    assigneeId: string | null;
};

type Team = {
    id: string;
    name: string;
    ownerId: string;
    linearAccessToken: string | null;
    linearOauthState: string | null;
};
type TeamUser = {
    id: string;
    userId: string;
    teamId: string;
};

type Database = {
    user: User;
    session: Session;
    account: Account;
    verification: Verification;
    issue: Issue;
    team: Team;
    teamUser: TeamUser;
};

declare const auth: {
    handler: (request: Request) => Promise<Response>;
    api: better_auth.InferAPI<{
        ok: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    ok: boolean;
                };
            } : {
                ok: boolean;
            }>;
            options: {
                method: "GET";
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                ok: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                    isAction: false;
                };
            } & {
                use: any[];
            };
            path: "/ok";
        };
        error: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: Response;
            } : Response>;
            options: {
                method: "GET";
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "text/html": {
                                        schema: {
                                            type: "string";
                                            description: string;
                                        };
                                    };
                                };
                            };
                        };
                    };
                    isAction: false;
                };
            } & {
                use: any[];
            };
            path: "/error";
        };
        signInSocial: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    provider: "apple" | "discord" | "facebook" | "github" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk" | "kick" | "zoom";
                    scopes?: string[] | undefined;
                    loginHint?: string | undefined;
                    idToken?: {
                        token: string;
                        refreshToken?: string | undefined;
                        accessToken?: string | undefined;
                        expiresAt?: number | undefined;
                        nonce?: string | undefined;
                    } | undefined;
                    callbackURL?: string | undefined;
                    requestSignUp?: boolean | undefined;
                    errorCallbackURL?: string | undefined;
                    newUserCallbackURL?: string | undefined;
                    disableRedirect?: boolean | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    redirect: boolean;
                    token: string;
                    url: undefined;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                } | {
                    url: string;
                    redirect: boolean;
                };
            } : {
                redirect: boolean;
                token: string;
                url: undefined;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } | {
                url: string;
                redirect: boolean;
            }>;
            options: {
                method: "POST";
                body: better_auth.ZodObject<{
                    callbackURL: better_auth.ZodOptional<better_auth.ZodString>;
                    newUserCallbackURL: better_auth.ZodOptional<better_auth.ZodString>;
                    errorCallbackURL: better_auth.ZodOptional<better_auth.ZodString>;
                    provider: better_auth.ZodEnum<["github", ...("apple" | "discord" | "facebook" | "github" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk" | "kick" | "zoom")[]]>;
                    disableRedirect: better_auth.ZodOptional<better_auth.ZodBoolean>;
                    idToken: better_auth.ZodOptional<better_auth.ZodObject<{
                        token: better_auth.ZodString;
                        nonce: better_auth.ZodOptional<better_auth.ZodString>;
                        accessToken: better_auth.ZodOptional<better_auth.ZodString>;
                        refreshToken: better_auth.ZodOptional<better_auth.ZodString>;
                        expiresAt: better_auth.ZodOptional<better_auth.ZodNumber>;
                    }, "strip", better_auth.ZodTypeAny, {
                        token: string;
                        refreshToken?: string | undefined;
                        accessToken?: string | undefined;
                        expiresAt?: number | undefined;
                        nonce?: string | undefined;
                    }, {
                        token: string;
                        refreshToken?: string | undefined;
                        accessToken?: string | undefined;
                        expiresAt?: number | undefined;
                        nonce?: string | undefined;
                    }>>;
                    scopes: better_auth.ZodOptional<better_auth.ZodArray<better_auth.ZodString, "many">>;
                    requestSignUp: better_auth.ZodOptional<better_auth.ZodBoolean>;
                    loginHint: better_auth.ZodOptional<better_auth.ZodString>;
                }, "strip", better_auth.ZodTypeAny, {
                    provider: "apple" | "discord" | "facebook" | "github" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk" | "kick" | "zoom";
                    scopes?: string[] | undefined;
                    loginHint?: string | undefined;
                    idToken?: {
                        token: string;
                        refreshToken?: string | undefined;
                        accessToken?: string | undefined;
                        expiresAt?: number | undefined;
                        nonce?: string | undefined;
                    } | undefined;
                    callbackURL?: string | undefined;
                    requestSignUp?: boolean | undefined;
                    errorCallbackURL?: string | undefined;
                    newUserCallbackURL?: string | undefined;
                    disableRedirect?: boolean | undefined;
                }, {
                    provider: "apple" | "discord" | "facebook" | "github" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk" | "kick" | "zoom";
                    scopes?: string[] | undefined;
                    loginHint?: string | undefined;
                    idToken?: {
                        token: string;
                        refreshToken?: string | undefined;
                        accessToken?: string | undefined;
                        expiresAt?: number | undefined;
                        nonce?: string | undefined;
                    } | undefined;
                    callbackURL?: string | undefined;
                    requestSignUp?: boolean | undefined;
                    errorCallbackURL?: string | undefined;
                    newUserCallbackURL?: string | undefined;
                    disableRedirect?: boolean | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        operationId: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            properties: {
                                                redirect: {
                                                    type: string;
                                                    enum: boolean[];
                                                };
                                                token: {
                                                    type: string;
                                                    description: string;
                                                    url: {
                                                        type: string;
                                                        nullable: boolean;
                                                    };
                                                    user: {
                                                        type: string;
                                                        properties: {
                                                            id: {
                                                                type: string;
                                                            };
                                                            email: {
                                                                type: string;
                                                            };
                                                            name: {
                                                                type: string;
                                                                nullable: boolean;
                                                            };
                                                            image: {
                                                                type: string;
                                                                nullable: boolean;
                                                            };
                                                            emailVerified: {
                                                                type: string;
                                                            };
                                                            createdAt: {
                                                                type: string;
                                                                format: string;
                                                            };
                                                            updatedAt: {
                                                                type: string;
                                                                format: string;
                                                            };
                                                        };
                                                        required: string[];
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-in/social";
        };
        callbackOAuth: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: {
                    state?: string | undefined;
                    code?: string | undefined;
                    device_id?: string | undefined;
                    error?: string | undefined;
                    user?: string | undefined;
                    error_description?: string | undefined;
                } | undefined;
            } & {
                method: "GET" | "POST";
            } & {
                query?: {
                    state?: string | undefined;
                    code?: string | undefined;
                    device_id?: string | undefined;
                    error?: string | undefined;
                    user?: string | undefined;
                    error_description?: string | undefined;
                } | undefined;
            } & {
                params: {
                    id: string;
                };
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: void;
            } : void>;
            options: {
                method: ("GET" | "POST")[];
                body: better_auth.ZodOptional<better_auth.ZodObject<{
                    code: better_auth.ZodOptional<better_auth.ZodString>;
                    error: better_auth.ZodOptional<better_auth.ZodString>;
                    device_id: better_auth.ZodOptional<better_auth.ZodString>;
                    error_description: better_auth.ZodOptional<better_auth.ZodString>;
                    state: better_auth.ZodOptional<better_auth.ZodString>;
                    user: better_auth.ZodOptional<better_auth.ZodString>;
                }, "strip", better_auth.ZodTypeAny, {
                    state?: string | undefined;
                    code?: string | undefined;
                    device_id?: string | undefined;
                    error?: string | undefined;
                    user?: string | undefined;
                    error_description?: string | undefined;
                }, {
                    state?: string | undefined;
                    code?: string | undefined;
                    device_id?: string | undefined;
                    error?: string | undefined;
                    user?: string | undefined;
                    error_description?: string | undefined;
                }>>;
                query: better_auth.ZodOptional<better_auth.ZodObject<{
                    code: better_auth.ZodOptional<better_auth.ZodString>;
                    error: better_auth.ZodOptional<better_auth.ZodString>;
                    device_id: better_auth.ZodOptional<better_auth.ZodString>;
                    error_description: better_auth.ZodOptional<better_auth.ZodString>;
                    state: better_auth.ZodOptional<better_auth.ZodString>;
                    user: better_auth.ZodOptional<better_auth.ZodString>;
                }, "strip", better_auth.ZodTypeAny, {
                    state?: string | undefined;
                    code?: string | undefined;
                    device_id?: string | undefined;
                    error?: string | undefined;
                    user?: string | undefined;
                    error_description?: string | undefined;
                }, {
                    state?: string | undefined;
                    code?: string | undefined;
                    device_id?: string | undefined;
                    error?: string | undefined;
                    user?: string | undefined;
                    error_description?: string | undefined;
                }>>;
                metadata: {
                    isAction: false;
                };
            } & {
                use: any[];
            };
            path: "/callback/:id";
        };
        getSession: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: {
                    disableCookieCache?: string | boolean | undefined;
                    disableRefresh?: string | boolean | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    session: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string | null | undefined | undefined;
                        userAgent?: string | null | undefined | undefined;
                    };
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                        image?: string | null | undefined | undefined;
                    };
                } | null;
            } : {
                session: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined | undefined;
                    userAgent?: string | null | undefined | undefined;
                };
                user: {
                    id: string;
                    name: string;
                    email: string;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    image?: string | null | undefined | undefined;
                };
            } | null>;
            options: {
                method: "GET";
                query: better_auth.ZodOptional<better_auth.ZodObject<{
                    disableCookieCache: better_auth.ZodOptional<better_auth.ZodOptional<better_auth.ZodUnion<[better_auth.ZodBoolean, better_auth.ZodEffects<better_auth.ZodString, boolean, string>]>>>;
                    disableRefresh: better_auth.ZodOptional<better_auth.ZodUnion<[better_auth.ZodBoolean, better_auth.ZodEffects<better_auth.ZodString, boolean, string>]>>;
                }, "strip", better_auth.ZodTypeAny, {
                    disableCookieCache?: boolean | undefined;
                    disableRefresh?: boolean | undefined;
                }, {
                    disableCookieCache?: string | boolean | undefined;
                    disableRefresh?: string | boolean | undefined;
                }>>;
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                session: {
                                                    $ref: string;
                                                };
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/get-session";
        };
        signOut: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                };
            } : {
                success: boolean;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-out";
        };
        signUpEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/sign-up/email", {
                method: "POST";
                body: better_auth.ZodRecord<better_auth.ZodString, better_auth.ZodAny>;
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            email: string;
                            password: string;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            email: {
                                                type: string;
                                                description: string;
                                            };
                                            password: {
                                                type: string;
                                                description: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [any] : [((any) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    token: null;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                } | {
                    token: string;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                };
            } : {
                token: null;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } | {
                token: string;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            options: {
                method: "POST";
                body: better_auth.ZodRecord<better_auth.ZodString, better_auth.ZodAny>;
                metadata: {
                    $Infer: {
                        body: {
                            name: string;
                            email: string;
                            password: string;
                        };
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            email: {
                                                type: string;
                                                description: string;
                                            };
                                            password: {
                                                type: string;
                                                description: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-up/email";
        };
        signInEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    password: string;
                    email: string;
                    callbackURL?: string | undefined;
                    rememberMe?: boolean | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    redirect: boolean;
                    token: string;
                    url: string | undefined;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                };
            } : {
                redirect: boolean;
                token: string;
                url: string | undefined;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            options: {
                method: "POST";
                body: better_auth.ZodObject<{
                    email: better_auth.ZodString;
                    password: better_auth.ZodString;
                    callbackURL: better_auth.ZodOptional<better_auth.ZodString>;
                    rememberMe: better_auth.ZodOptional<better_auth.ZodDefault<better_auth.ZodBoolean>>;
                }, "strip", better_auth.ZodTypeAny, {
                    password: string;
                    email: string;
                    callbackURL?: string | undefined;
                    rememberMe?: boolean | undefined;
                }, {
                    password: string;
                    email: string;
                    callbackURL?: string | undefined;
                    rememberMe?: boolean | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            description: string;
                                            properties: {
                                                redirect: {
                                                    type: string;
                                                    enum: boolean[];
                                                };
                                                token: {
                                                    type: string;
                                                    description: string;
                                                };
                                                url: {
                                                    type: string;
                                                    nullable: boolean;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            nullable: boolean;
                                                        };
                                                        image: {
                                                            type: string;
                                                            nullable: boolean;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/sign-in/email";
        };
        forgetPassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    redirectTo?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: better_auth.ZodObject<{
                    email: better_auth.ZodString;
                    redirectTo: better_auth.ZodOptional<better_auth.ZodString>;
                }, "strip", better_auth.ZodTypeAny, {
                    email: string;
                    redirectTo?: string | undefined;
                }, {
                    email: string;
                    redirectTo?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/forget-password";
        };
        resetPassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newPassword: string;
                    token?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: {
                    token?: string | undefined;
                } | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                query: better_auth.ZodOptional<better_auth.ZodObject<{
                    token: better_auth.ZodOptional<better_auth.ZodString>;
                }, "strip", better_auth.ZodTypeAny, {
                    token?: string | undefined;
                }, {
                    token?: string | undefined;
                }>>;
                body: better_auth.ZodObject<{
                    newPassword: better_auth.ZodString;
                    token: better_auth.ZodOptional<better_auth.ZodString>;
                }, "strip", better_auth.ZodTypeAny, {
                    newPassword: string;
                    token?: string | undefined;
                }, {
                    newPassword: string;
                    token?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/reset-password";
        };
        verifyEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    token: string;
                    callbackURL?: string | undefined;
                };
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: void | {
                    status: boolean;
                    user: {
                        id: any;
                        email: any;
                        name: any;
                        image: any;
                        emailVerified: any;
                        createdAt: any;
                        updatedAt: any;
                    };
                } | {
                    status: boolean;
                    user: null;
                };
            } : void | {
                status: boolean;
                user: {
                    id: any;
                    email: any;
                    name: any;
                    image: any;
                    emailVerified: any;
                    createdAt: any;
                    updatedAt: any;
                };
            } | {
                status: boolean;
                user: null;
            }>;
            options: {
                method: "GET";
                query: better_auth.ZodObject<{
                    token: better_auth.ZodString;
                    callbackURL: better_auth.ZodOptional<better_auth.ZodString>;
                }, "strip", better_auth.ZodTypeAny, {
                    token: string;
                    callbackURL?: string | undefined;
                }, {
                    token: string;
                    callbackURL?: string | undefined;
                }>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        parameters: ({
                            name: string;
                            in: "query";
                            description: string;
                            required: true;
                            schema: {
                                type: "string";
                            };
                        } | {
                            name: string;
                            in: "query";
                            description: string;
                            required: false;
                            schema: {
                                type: "string";
                            };
                        })[];
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/verify-email";
        };
        sendVerificationEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    email: string;
                    callbackURL?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: better_auth.ZodObject<{
                    email: better_auth.ZodString;
                    callbackURL: better_auth.ZodOptional<better_auth.ZodString>;
                }, "strip", better_auth.ZodTypeAny, {
                    email: string;
                    callbackURL?: string | undefined;
                }, {
                    email: string;
                    callbackURL?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            email: {
                                                type: string;
                                                description: string;
                                                example: string;
                                            };
                                            callbackURL: {
                                                type: string;
                                                description: string;
                                                example: string;
                                                nullable: boolean;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                    example: boolean;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            "400": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                message: {
                                                    type: string;
                                                    description: string;
                                                    example: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/send-verification-email";
        };
        changeEmail: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newEmail: string;
                    callbackURL?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: better_auth.ZodObject<{
                    newEmail: better_auth.ZodString;
                    callbackURL: better_auth.ZodOptional<better_auth.ZodString>;
                }, "strip", better_auth.ZodTypeAny, {
                    newEmail: string;
                    callbackURL?: string | undefined;
                }, {
                    newEmail: string;
                    callbackURL?: string | undefined;
                }>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                                message: {
                                                    type: string;
                                                    enum: string[];
                                                    description: string;
                                                    nullable: boolean;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/change-email";
        };
        changePassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newPassword: string;
                    currentPassword: string;
                    revokeOtherSessions?: boolean | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    token: string | null;
                    user: {
                        id: string;
                        email: string;
                        name: string;
                        image: string | null | undefined;
                        emailVerified: boolean;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                };
            } : {
                token: string | null;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    image: string | null | undefined;
                    emailVerified: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            options: {
                method: "POST";
                body: better_auth.ZodObject<{
                    newPassword: better_auth.ZodString;
                    currentPassword: better_auth.ZodString;
                    revokeOtherSessions: better_auth.ZodOptional<better_auth.ZodBoolean>;
                }, "strip", better_auth.ZodTypeAny, {
                    newPassword: string;
                    currentPassword: string;
                    revokeOtherSessions?: boolean | undefined;
                }, {
                    newPassword: string;
                    currentPassword: string;
                    revokeOtherSessions?: boolean | undefined;
                }>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                    nullable: boolean;
                                                    description: string;
                                                };
                                                user: {
                                                    type: string;
                                                    properties: {
                                                        id: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        email: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        name: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        image: {
                                                            type: string;
                                                            format: string;
                                                            nullable: boolean;
                                                            description: string;
                                                        };
                                                        emailVerified: {
                                                            type: string;
                                                            description: string;
                                                        };
                                                        createdAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                        updatedAt: {
                                                            type: string;
                                                            format: string;
                                                            description: string;
                                                        };
                                                    };
                                                    required: string[];
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/change-password";
        };
        setPassword: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    newPassword: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: better_auth.ZodObject<{
                    newPassword: better_auth.ZodString;
                }, "strip", better_auth.ZodTypeAny, {
                    newPassword: string;
                }, {
                    newPassword: string;
                }>;
                metadata: {
                    SERVER_ONLY: true;
                };
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
            } & {
                use: any[];
            };
            path: "/set-password";
        };
        updateUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(...inputCtx: better_call.HasRequiredKeys<better_call.InputContext<"/update-user", {
                method: "POST";
                body: better_auth.ZodRecord<better_auth.ZodString, better_auth.ZodAny>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    $Infer: {
                        body: Partial<better_auth.Prettify<{
                            name?: string;
                            image?: string | null;
                        }>>;
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            }>> extends true ? [any] : [((any) | undefined)?]): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: better_auth.ZodRecord<better_auth.ZodString, better_auth.ZodAny>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    $Infer: {
                        body: Partial<better_auth.Prettify<{
                            name?: string;
                            image?: string | null;
                        }>>;
                    };
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            name: {
                                                type: string;
                                                description: string;
                                            };
                                            image: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/update-user";
        };
        deleteUser: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    password?: string | undefined;
                    token?: string | undefined;
                    callbackURL?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                    message: string;
                };
            } : {
                success: boolean;
                message: string;
            }>;
            options: {
                method: "POST";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                body: better_auth.ZodObject<{
                    callbackURL: better_auth.ZodOptional<better_auth.ZodString>;
                    password: better_auth.ZodOptional<better_auth.ZodString>;
                    token: better_auth.ZodOptional<better_auth.ZodString>;
                }, "strip", better_auth.ZodTypeAny, {
                    password?: string | undefined;
                    token?: string | undefined;
                    callbackURL?: string | undefined;
                }, {
                    password?: string | undefined;
                    token?: string | undefined;
                    callbackURL?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                    description: string;
                                                };
                                                message: {
                                                    type: string;
                                                    enum: string[];
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/delete-user";
        };
        forgetPasswordCallback: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    callbackURL: string;
                };
            } & {
                params: {
                    token: string;
                };
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: never;
            } : never>;
            options: {
                method: "GET";
                query: better_auth.ZodObject<{
                    callbackURL: better_auth.ZodString;
                }, "strip", better_auth.ZodTypeAny, {
                    callbackURL: string;
                }, {
                    callbackURL: string;
                }>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/reset-password/:token";
        };
        listSessions: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: better_auth.Prettify<{
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined | undefined;
                    userAgent?: string | null | undefined | undefined;
                }>[];
            } : better_auth.Prettify<{
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
            }>[]>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/list-sessions";
        };
        revokeSession: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    token: string;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: better_auth.ZodObject<{
                    token: better_auth.ZodString;
                }, "strip", better_auth.ZodTypeAny, {
                    token: string;
                }, {
                    token: string;
                }>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            token: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/revoke-session";
        };
        revokeSessions: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                requireHeaders: true;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/revoke-sessions";
        };
        revokeOtherSessions: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/revoke-other-sessions";
        };
        linkSocialAccount: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    provider: "apple" | "discord" | "facebook" | "github" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk" | "kick" | "zoom";
                    scopes?: string[] | undefined;
                    callbackURL?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    url: string;
                    redirect: boolean;
                };
            } : {
                url: string;
                redirect: boolean;
            }>;
            options: {
                method: "POST";
                requireHeaders: true;
                body: better_auth.ZodObject<{
                    callbackURL: better_auth.ZodOptional<better_auth.ZodString>;
                    provider: better_auth.ZodEnum<["github", ...("apple" | "discord" | "facebook" | "github" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk" | "kick" | "zoom")[]]>;
                    scopes: better_auth.ZodOptional<better_auth.ZodArray<better_auth.ZodString, "many">>;
                }, "strip", better_auth.ZodTypeAny, {
                    provider: "apple" | "discord" | "facebook" | "github" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk" | "kick" | "zoom";
                    scopes?: string[] | undefined;
                    callbackURL?: string | undefined;
                }, {
                    provider: "apple" | "discord" | "facebook" | "github" | "google" | "microsoft" | "spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | "roblox" | "vk" | "kick" | "zoom";
                    scopes?: string[] | undefined;
                    callbackURL?: string | undefined;
                }>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                url: {
                                                    type: string;
                                                    description: string;
                                                };
                                                redirect: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/link-social";
        };
        listUserAccounts: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    id: string;
                    provider: string;
                    createdAt: Date;
                    updatedAt: Date;
                    accountId: string;
                    scopes: string[];
                }[];
            } : {
                id: string;
                provider: string;
                createdAt: Date;
                updatedAt: Date;
                accountId: string;
                scopes: string[];
            }[]>;
            options: {
                method: "GET";
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array";
                                            items: {
                                                type: string;
                                                properties: {
                                                    id: {
                                                        type: string;
                                                    };
                                                    provider: {
                                                        type: string;
                                                    };
                                                    createdAt: {
                                                        type: string;
                                                        format: string;
                                                    };
                                                    updatedAt: {
                                                        type: string;
                                                        format: string;
                                                    };
                                                };
                                                accountId: {
                                                    type: string;
                                                };
                                                scopes: {
                                                    type: string;
                                                    items: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/list-accounts";
        };
        deleteUserCallback: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body?: undefined;
            } & {
                method?: "GET" | undefined;
            } & {
                query: {
                    token: string;
                    callbackURL?: string | undefined;
                };
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    success: boolean;
                    message: string;
                };
            } : {
                success: boolean;
                message: string;
            }>;
            options: {
                method: "GET";
                query: better_auth.ZodObject<{
                    token: better_auth.ZodString;
                    callbackURL: better_auth.ZodOptional<better_auth.ZodString>;
                }, "strip", better_auth.ZodTypeAny, {
                    token: string;
                    callbackURL?: string | undefined;
                }, {
                    token: string;
                    callbackURL?: string | undefined;
                }>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                    description: string;
                                                };
                                                message: {
                                                    type: string;
                                                    enum: string[];
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/delete-user/callback";
        };
        unlinkAccount: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    providerId: string;
                    accountId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: {
                    status: boolean;
                };
            } : {
                status: boolean;
            }>;
            options: {
                method: "POST";
                body: better_auth.ZodObject<{
                    providerId: better_auth.ZodString;
                    accountId: better_auth.ZodOptional<better_auth.ZodString>;
                }, "strip", better_auth.ZodTypeAny, {
                    providerId: string;
                    accountId?: string | undefined;
                }, {
                    providerId: string;
                    accountId?: string | undefined;
                }>;
                use: ((inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            name: string;
                            email: string;
                            emailVerified: boolean;
                            createdAt: Date;
                            updatedAt: Date;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/unlink-account";
        };
        refreshToken: {
            <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                body: {
                    providerId: string;
                    accountId?: string | undefined;
                    userId?: string | undefined;
                };
            } & {
                method?: "POST" | undefined;
            } & {
                query?: Record<string, any> | undefined;
            } & {
                params?: Record<string, any>;
            } & {
                request?: Request;
            } & {
                headers?: HeadersInit;
            } & {
                asResponse?: boolean;
                returnHeaders?: boolean;
                use?: better_call.Middleware[];
                path?: string;
            } & {
                asResponse?: AsResponse | undefined;
                returnHeaders?: ReturnHeaders | undefined;
            }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                headers: Headers;
                response: better_auth.OAuth2Tokens;
            } : better_auth.OAuth2Tokens>;
            options: {
                method: "POST";
                body: better_auth.ZodObject<{
                    providerId: better_auth.ZodString;
                    accountId: better_auth.ZodOptional<better_auth.ZodString>;
                    userId: better_auth.ZodOptional<better_auth.ZodString>;
                }, "strip", better_auth.ZodTypeAny, {
                    providerId: string;
                    accountId?: string | undefined;
                    userId?: string | undefined;
                }, {
                    providerId: string;
                    accountId?: string | undefined;
                    userId?: string | undefined;
                }>;
                metadata: {
                    openapi: {
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                tokenType: {
                                                    type: string;
                                                };
                                                idToken: {
                                                    type: string;
                                                };
                                                accessToken: {
                                                    type: string;
                                                };
                                                refreshToken: {
                                                    type: string;
                                                };
                                                accessTokenExpiresAt: {
                                                    type: string;
                                                    format: string;
                                                };
                                                refreshTokenExpiresAt: {
                                                    type: string;
                                                    format: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                            400: {
                                description: string;
                            };
                        };
                    };
                };
            } & {
                use: any[];
            };
            path: "/refresh-token";
        };
    }>;
    options: {
        database: {
            db: kysely.Kysely<Database>;
            type: "postgres";
            casing: "snake";
        };
        emailAndPassword: {
            enabled: true;
        };
        trustedOrigins: string[];
    };
    $context: Promise<better_auth.AuthContext>;
    $Infer: {
        Session: {
            session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined | undefined;
                userAgent?: string | null | undefined | undefined;
            };
            user: {
                id: string;
                name: string;
                email: string;
                emailVerified: boolean;
                createdAt: Date;
                updatedAt: Date;
                image?: string | null | undefined | undefined;
            };
        };
    };
    $ERROR_CODES: {
        USER_NOT_FOUND: string;
        FAILED_TO_CREATE_USER: string;
        FAILED_TO_CREATE_SESSION: string;
        FAILED_TO_UPDATE_USER: string;
        FAILED_TO_GET_SESSION: string;
        INVALID_PASSWORD: string;
        INVALID_EMAIL: string;
        INVALID_EMAIL_OR_PASSWORD: string;
        SOCIAL_ACCOUNT_ALREADY_LINKED: string;
        PROVIDER_NOT_FOUND: string;
        INVALID_TOKEN: string;
        ID_TOKEN_NOT_SUPPORTED: string;
        FAILED_TO_GET_USER_INFO: string;
        USER_EMAIL_NOT_FOUND: string;
        EMAIL_NOT_VERIFIED: string;
        PASSWORD_TOO_SHORT: string;
        PASSWORD_TOO_LONG: string;
        USER_ALREADY_EXISTS: string;
        EMAIL_CAN_NOT_BE_UPDATED: string;
        CREDENTIAL_ACCOUNT_NOT_FOUND: string;
        SESSION_EXPIRED: string;
        FAILED_TO_UNLINK_LAST_ACCOUNT: string;
        ACCOUNT_NOT_FOUND: string;
    };
};

type Env = {
    Variables: {
        user: (typeof auth.$Infer.Session.user & {
            teamId: string | null;
        }) | null;
        session: typeof auth.$Infer.Session.session | null;
    };
};

declare const appRouter: hono_hono_base.HonoBase<Env, ({
    "*": {};
} & {
    "/auth/*": {
        [x: `$${Lowercase<string>}`]: {
            input: {};
            output: {};
            outputFormat: string;
            status: hono_utils_http_status.StatusCode;
        };
    };
} & {
    "/oauth/linear": {
        $get: {
            input: {};
            output: {
                url: string;
            };
            outputFormat: "json";
            status: hono_utils_http_status.ContentfulStatusCode;
        };
    };
} & {
    "/oauth/linear/callback": {
        $post: {
            input: {
                json: {
                    code: string;
                    state: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: hono_utils_http_status.ContentfulStatusCode;
        };
    };
}) | hono_types.MergeSchemaPath<{
    "*": {};
} & {
    "/": {
        $post: {
            input: {
                json: {
                    status: "backlog" | "todo" | "in_progress" | "in_review" | "done" | "canceled" | "duplicate";
                    title: string;
                    description: string;
                    priority: "no_priority" | "urgent" | "high" | "medium" | "low";
                };
            };
            output: {
                id: string;
                status: IssueStatus;
                title: string;
                description: string;
                priority: IssuePriority;
                teamId: string;
                assigneeId: string | null;
            };
            outputFormat: "json";
            status: 201;
        };
    };
} & {
    "/": {
        $get: {
            input: {};
            output: {
                issues: {
                    id: string;
                    status: IssueStatus;
                    title: string;
                    description: string;
                    priority: IssuePriority;
                    teamId: string;
                    assigneeId: string | null;
                }[];
            };
            outputFormat: "json";
            status: hono_utils_http_status.ContentfulStatusCode;
        };
    };
} & {
    "/:id": {
        $get: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {};
            outputFormat: string;
            status: hono_utils_http_status.StatusCode;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {};
            outputFormat: string;
            status: hono_utils_http_status.StatusCode;
        };
    };
} & {
    "/:id": {
        $put: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {};
            outputFormat: string;
            status: hono_utils_http_status.StatusCode;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {};
            outputFormat: string;
            status: hono_utils_http_status.StatusCode;
        };
    };
} & {
    "/:id": {
        $delete: {
            input: {
                param: {
                    id: string;
                };
            };
            output: {};
            outputFormat: string;
            status: hono_utils_http_status.StatusCode;
        } | {
            input: {
                param: {
                    id: string;
                };
            };
            output: {};
            outputFormat: string;
            status: hono_utils_http_status.StatusCode;
        };
    };
}, "/issue"> | hono_types.MergeSchemaPath<{
    "*": {};
} & {
    "/": {
        $post: {
            input: {
                json: {
                    name: string;
                };
            };
            output: {
                id: string;
                name: string;
                ownerId: string;
                linearAccessToken: string | null;
                linearOauthState: string | null;
            };
            outputFormat: "json";
            status: 200;
        };
    };
}, "/team"> | hono_types.MergeSchemaPath<{
    "/": {
        $get: {
            input: {};
            output: string;
            outputFormat: "text";
            status: hono_utils_http_status.ContentfulStatusCode;
        };
    };
}, "/hono">, "/">;
type AppRouter = typeof appRouter;

export { appRouter };
export type { AppRouter };
