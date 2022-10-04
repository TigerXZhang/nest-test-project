import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    providers: [
        {
            provide: 'config',
            useValue: {
                baseUrl: '/nest'
            }
        }
    ],
    exports: [
        {
            provide: 'config',
            useValue: {
                baseUrl: '/nest'
            }
        }
    ]
})

export class ConfigModule {

}