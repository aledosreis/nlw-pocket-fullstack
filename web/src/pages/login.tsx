import { Button } from '@/components/ui/button'
import { InOrbitIcon } from '@/components/in-orbit-icon'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export function Login() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="py-10 max-w-[480px] w-full flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold">in.Orbit</span>
        </div>

        <form
          // onSubmit={handleSubmit(handleCreateGoal)}
          className="flex-1 flex flex-col gap-6 justify-between"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                autoFocus
                placeholder="Username"
                // {...register('title')}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                // {...register('title')}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button className="flex-1">Login</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
