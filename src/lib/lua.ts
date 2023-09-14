import { isDevelopment } from './env'

declare function GetParentResourceName(): string

type MockHandler = (...args: any[]) => any

const mocks: Record<string, MockHandler> = {}

export async function lua<T>(
    name: string,
    payload = {},
): Promise<T | undefined> {
    if (isDevelopment()) {
        return mocks[name] ? (mocks[name](payload) as T) : undefined
    }

    const url = `https://${GetParentResourceName()}/${name}`
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
    })

    return response.ok ? response.json() : undefined
}

export const fetchFile = async <T = unknown>(
    fileURL: string,
): Promise<T | undefined> => {
    if (isDevelopment()) {
        return mocks[fileURL] ? (mocks[fileURL]() as T) : undefined
    }

    const url = `https://cfx-nui-${GetParentResourceName()}/${fileURL}`

    const response = await fetch(url)

    return response.ok ? response.json() : undefined
}

export function addLuaMock(name: string, handler: MockHandler): void {
    mocks[name] = handler
}
