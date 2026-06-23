// @ts-ignore - Deno environment
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { SchedulingEngine } from './scheduling-engine'
import { PublisherRegistry } from '../_shared/publisher/social-media-publisher.interface'
import { TelegramPublisher } from '../_shared/publisher/telegram.publisher'

// Type declaration for Deno environment
// @ts-ignore
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

// Initialize publisher registry
const publisherRegistry = new PublisherRegistry()
publisherRegistry.register('telegram', new TelegramPublisher())

// Initialize scheduling engine
const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set')
}

const schedulingEngine = new SchedulingEngine(
  publisherRegistry,
  supabaseUrl,
  supabaseServiceRoleKey
)

serve(async (req: Request) => {
  try {
    // Only allow POST requests for cron jobs
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 })
    }

    // Verify cron authorization (optional, depending on Supabase cron setup)
    const authHeader = req.headers.get('Authorization')
    if (authHeader !== `Bearer ${Deno.env.get('CRON_SECRET')}`) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Execute the scheduling tick
    const summary = await schedulingEngine.tick()

    return new Response(JSON.stringify(summary), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: any) {
    console.error('Scheduler error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
