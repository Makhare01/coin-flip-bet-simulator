import { useUser } from '@/hooks/use-user';
import { Coins } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export const Navigation = () => {
    const { userSettings } = useUser();
    const balances: [string, number][] = Object.entries(userSettings?.balances ?? {});

    return (
        <header className="w-full bg-card border-b border-gray-800">
            <nav className="container mx-auto flex items-center justify-between py-5">
                <div className="flex items-center gap-2">
                    <div className='w-12 h-12 bg-primary rounded flex items-center justify-center'>
                        <Coins className='size-7' />
                    </div>
                    <p className='text-2xl font-bold'>Coin <span className='text-primary'>Flip</span></p>
                </div>

                <div className='flex items-center'>
                    <Tabs defaultValue={userSettings?.preferredCrypto} onValueChange={(value) => {
                        console.log(value);
                    }}>
                        <TabsList>
                            {balances.map(([crypto, balance]) => (
                                <TabsTrigger key={crypto} value={crypto}>
                                    {crypto.toUpperCase()} {balance.toFixed(2)}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>
            </nav>
        </header>
    )
}