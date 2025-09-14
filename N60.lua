-- // الخدمات

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local TeleportService = game:GetService("TeleportService")
local HttpService = game:GetService("HttpService")

local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local hrp = character:WaitForChild("HumanoidRootPart")
local humanoid = character:WaitForChild("Humanoid")

-------------------------
-- واجهة 1: N60 Hub (Flip + Sit Toggle + God Mode + ESP)
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "N60Hub"
screenGui.ResetOnSpawn = false
screenGui.Parent = player:WaitForChild("PlayerGui")

local frame = Instance.new("Frame", screenGui)
frame.Size = UDim2.new(0, 160, 0, 90)
frame.Position = UDim2.new(0.05,0,0.2,0)
frame.BackgroundColor3 = Color3.fromRGB(0,0,0)
frame.BorderColor3 = Color3.fromRGB(255,0,0)
frame.BorderSizePixel = 3
frame.Active = true
frame.Draggable = true

local title = Instance.new("TextLabel", frame)
title.Size = UDim2.new(1,0,0,25)
title.BackgroundTransparency = 1
title.Text = "N60 Hub"
title.TextColor3 = Color3.fromRGB(255,0,0)
title.Font = Enum.Font.SourceSansBold
title.TextSize = 20

-- زر اختفاء (Flip + Sit Toggle)
local hideBtn = Instance.new("TextButton", frame)
hideBtn.Size = UDim2.new(0.8,0,0,30)
hideBtn.Position = UDim2.new(0.1,0,0.5,0)
hideBtn.BackgroundColor3 = Color3.fromRGB(30,30,30)
hideBtn.Text = "اختفاء"
hideBtn.TextColor3 = Color3.fromRGB(255,255,255)
hideBtn.Font = Enum.Font.SourceSansBold
hideBtn.TextSize = 18

local hidden = false
local originalCFrame

hideBtn.MouseButton1Click:Connect(function()
    if not hrp or not humanoid then return end

    if not hidden then
        originalCFrame = hrp.CFrame
        hrp.CFrame = hrp.CFrame * CFrame.Angles(math.rad(180),0,0) * CFrame.new(0,-5,0)
        humanoid.Sit = true
        hidden = true
        hideBtn.Text = "إلغاء الاختفاء"
    else
        if originalCFrame then
            hrp.CFrame = originalCFrame
        else
            hrp.CFrame = hrp.CFrame * CFrame.Angles(math.rad(-180),0,0)
        end
        humanoid.Sit = false
        hidden = false
        hideBtn.Text = "اختفاء"
    end
end)

-- // God Mode تلقائي
local function enableGodMode()
    character = player.Character or player.CharacterAdded:Wait()
    humanoid = character:WaitForChild("Humanoid")
    humanoid.Health = humanoid.MaxHealth
    humanoid:GetPropertyChangedSignal("Health"):Connect(function()
        if humanoid.Health < humanoid.MaxHealth then
            humanoid.Health = humanoid.MaxHealth
        end
    end)
end

enableGodMode()
player.CharacterAdded:Connect(function(char)
    character = char
    hrp = char:WaitForChild("HumanoidRootPart")
    humanoid = char:WaitForChild("Humanoid")
    enableGodMode()
end)

-- // ESP لأطراف اللاعبين
local function createESP(targetPlayer)
    if targetPlayer == player then return end
    local targetChar = targetPlayer.Character
    if not targetChar then return end

    local function makeESP(part)
        if not part then return end
        local box = Instance.new("BoxHandleAdornment")
        box.Adornee = part
        box.Color3 = Color3.fromRGB(255,0,0)
        box.Size = part.Size
        box.AlwaysOnTop = true
        box.ZIndex = 10
        box.Parent = part
    end

    local function addESP()
        for _,p in pairs(targetChar:GetChildren()) do
            if p:IsA("BasePart") then
                makeESP(p)
            end
        end
    end

    addESP()
    targetPlayer.CharacterAdded:Connect(function(char)
        targetChar = char
        addESP()
    end)
end

for _, p in pairs(Players:GetPlayers()) do
    createESP(p)
end

Players.PlayerAdded:Connect(function(p)
    p.CharacterAdded:Connect(function()
        createESP(p)
    end)
end)

-------------------------
-- واجهة 2: Anti Hub (مضاد ضرب + تغيير السيرفر)
local antiGui = Instance.new("ScreenGui", player.PlayerGui)
antiGui.ResetOnSpawn = false

local antiFrame = Instance.new("Frame", antiGui)
antiFrame.Size = UDim2.new(0,160,0,160)
antiFrame.Position = UDim2.new(0.7,0,0.5,-80)
antiFrame.BackgroundColor3 = Color3.fromRGB(0,0,0)
antiFrame.BorderColor3 = Color3.fromRGB(255,0,0)
antiFrame.BorderSizePixel = 2
antiFrame.Active = true
antiFrame.Draggable = true

local antiTitle = Instance.new("TextLabel", antiFrame)
antiTitle.Size = UDim2.new(1,0,0,20)
antiTitle.Position = UDim2.new(0,0,0,0)
antiTitle.BackgroundColor3 = Color3.fromRGB(30,30,30)
antiTitle.Text = "N60 Hub"
antiTitle.TextColor3 = Color3.fromRGB(255,0,0)
antiTitle.Font = Enum.Font.SourceSansBold
antiTitle.TextScaled = true

-- زر مضاد ضرب
local vflyBtn = Instance.new("TextButton", antiFrame)
vflyBtn.Size = UDim2.new(0.8,0,0,30)
vflyBtn.Position = UDim2.new(0.1,0,0.25,0)
vflyBtn.Text = "مضاد ضرب"
vflyBtn.Font = Enum.Font.SourceSansBold
vflyBtn.TextScaled = true
vflyBtn.TextColor3 = Color3.fromRGB(255,255,255)
vflyBtn.BackgroundColor3 = Color3.fromRGB(255,0,0)

local timerLabel = Instance.new("TextLabel", antiFrame)
timerLabel.Size = UDim2.new(0.8,0,0,20)
timerLabel.Position = UDim2.new(0.1,0,0.55,0)
timerLabel.BackgroundColor3 = Color3.fromRGB(0,255,0)
timerLabel.TextColor3 = Color3.fromRGB(0,0,0)
timerLabel.Font = Enum.Font.SourceSansBold
timerLabel.TextScaled = true
timerLabel.Visible = false

local cooldownLabel = Instance.new("TextLabel", antiFrame)
cooldownLabel.Size = UDim2.new(0.8,0,0,20)
cooldownLabel.Position = UDim2.new(0.1,0,0.75,0)
cooldownLabel.BackgroundColor3 = Color3.fromRGB(255,0,0)
cooldownLabel.TextColor3 = Color3.fromRGB(0,0,0)
cooldownLabel.Font = Enum.Font.SourceSansBold
cooldownLabel.TextScaled = true
cooldownLabel.Visible = false

local hoverHeight = 11
local hoverTime = 0.50
local groundTime = 0.10
local riseSpeed = 40
local fallSpeed = 40
local ascending = true
local startY = hrp.Position.Y
local targetY = startY + hoverHeight
local hoverStart = 0

local vflyEnabled = false
local cooldownActive = false

vflyBtn.MouseButton1Click:Connect(function()
    if vflyEnabled or cooldownActive then return end

    -- المضاد يعمل لمدة 5.3 ثانية
    vflyEnabled = true
    vflyBtn.BackgroundColor3 = Color3.fromRGB(0,255,0)
    timerLabel.Visible = true

    local countdown =5
    while countdown > 0 do
        timerLabel.Text = string.format("%.1f", countdown).."s"
        task.wait(0.1)
        countdown = countdown - 0.1
    end

    -- نهاية العد: توقف المضاد، يظهر المؤقت الثاني 1 ثانية
    vflyEnabled = false
    timerLabel.Visible = false
    timerLabel.Text = ""

    cooldownActive = true
    cooldownLabel.Visible = true
    cooldownLabel.Text = "اصبر..."
    vflyBtn.BackgroundColor3 = Color3.fromRGB(255,0,0)

    task.wait(1) -- ثانية واحدة
    cooldownActive = false
    cooldownLabel.Visible = false
    cooldownLabel.Text = ""
end)

-- زر تغيير السيرفر
local serverBtn = Instance.new("TextButton", antiFrame)
serverBtn.Size = UDim2.new(0.8,0,0,30)
serverBtn.Position = UDim2.new(0.1,0,0.85,0)
serverBtn.Text = "تغيير سيرفر"
serverBtn.Font = Enum.Font.SourceSansBold
serverBtn.TextScaled = true
serverBtn.TextColor3 = Color3.fromRGB(255,255,255)
serverBtn.BackgroundColor3 = Color3.fromRGB(255,0,0)

serverBtn.MouseButton1Click:Connect(function()
    local gameId = game.PlaceId
    local servers = {}
    local req = game:HttpGet("https://games.roblox.com/v1/games/"..gameId.."/servers/Public?sortOrder=Asc&limit=100")
    local data = HttpService:JSONDecode(req)
    for _,server in pairs(data.data) do
        if server.playing < server.maxPlayers and server.id ~= game.JobId then
            table.insert(servers, server.id)
        end
    end
    if #servers > 0 then
        TeleportService:TeleportToPlaceInstance(gameId, servers[math.random(1,#servers)], player)
    else
        TeleportService:Teleport(gameId, player)
    end
end)

-- Heartbeat لمضاد ضرب مع الانتظار على الأرض
RunService.Heartbeat:Connect(function(dt)
    if character and hrp and vflyEnabled then
        local pos = hrp.Position
        if ascending then
            local newY = math.min(pos.Y + riseSpeed*dt, targetY)
            hrp.CFrame = CFrame.new(pos.X,newY,pos.Z)
            if newY >= targetY-0.1 then
                ascending = false
                hoverStart = tick()
            end
        else
            if tick() - hoverStart < hoverTime then
                hrp.CFrame = CFrame.new(pos.X,targetY,pos.Z)
            else
                local newY = math.max(pos.Y - fallSpeed*dt, startY)
                hrp.CFrame = CFrame.new(pos.X,newY,pos.Z)
                if newY <= startY+0.1 then
                    task.spawn(function()
                        task.wait(groundTime)
                        ascending = true
                        startY = hrp.Position.Y
                        targetY = startY + hoverHeight
                        hoverStart = tick() - hoverTime
                    end)
                end
            end
        end
    end
end)

-- تحديث الشخصية بعد الموت
player.CharacterAdded:Connect(function(char)
    character = char
    humanoid = character:WaitForChild("Humanoid")
    hrp = character:WaitForChild("HumanoidRootPart")
end)

local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")
local LocalPlayer = Players.LocalPlayer
local backpack = LocalPlayer:WaitForChild("Backpack")
local character = LocalPlayer.Character or LocalPlayer.CharacterAdded:Wait()

-- تنظيف واجهة قديمة
local existing = LocalPlayer:FindFirstChild("PlayerGui") and LocalPlayer.PlayerGui:FindFirstChild("N60HubGui")
if existing then existing:Destroy() end

-- إنشاء واجهة
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "N60HubGui"
screenGui.ResetOnSpawn = false
screenGui.Parent = LocalPlayer:WaitForChild("PlayerGui")

local main = Instance.new("Frame")
main.Name = "Main"
main.Size = UDim2.new(0, 180, 0, 80)
main.Position = UDim2.new(0.5, -90, 0.35, -40) -- منتصف الشاشة فوق شوي
main.BackgroundColor3 = Color3.fromRGB(0,0,0)
main.BorderSizePixel = 0
main.Parent = screenGui

-- حواف حمراء
local stroke = Instance.new("UIStroke")
stroke.Parent = main
stroke.Color = Color3.fromRGB(255,0,0)
stroke.Thickness = 3

-- عنوان
local title = Instance.new("TextLabel")
title.Parent = main
title.Size = UDim2.new(1,-10,0,24)
title.Position = UDim2.new(0,5,0,5)
title.BackgroundTransparency = 1
title.Text = "N60 Hub"
title.Font = Enum.Font.GothamBold
title.TextSize = 15
title.TextColor3 = Color3.new(1,1,1)
title.TextXAlignment = Enum.TextXAlignment.Left

-- زر تفعيل
local toggleBtn = Instance.new("TextButton")
toggleBtn.Parent = main
toggleBtn.Size = UDim2.new(0.9,0,0,30)
toggleBtn.Position = UDim2.new(0.05,0,0,35)
toggleBtn.BackgroundColor3 = Color3.fromRGB(28,28,28)
toggleBtn.Text = "مضاد سرقه: OFF"
toggleBtn.TextColor3 = Color3.fromRGB(255,255,255)

-- قائمة الأدوات المراد الإمساك بها
local toolNames = {
	"coil","trap","bee","rage","hook","taser","cloak",
	"bomb","head","wep","cloner","sentry","sword","laser","body"
}

-- دالة لمطابقة الأدوات
local function isMatchingTool(name)
	name = name:lower()
	for _, t in ipairs(toolNames) do
		if string.find(name, t) then
			return true
		end
	end
	return false
end

-- متغيرات التشغيل
local running = false
local frozen = false

-- وظيفة التشغيل/إيقاف
local function toggleFunction()
	running = not running
	local char = LocalPlayer.Character
	local hum = char and char:FindFirstChild("Humanoid")
	local hrp = char and char:FindFirstChild("HumanoidRootPart")
	if not char or not hum or not hrp then return end

	if running then
		toggleBtn.Text = "Activate: ON"
		toggleBtn.BackgroundColor3 = Color3.fromRGB(0,255,0)
		
		-- تفعيل Freeze
		frozen = true
		hum.PlatformStand = true
		hum.WalkSpeed = 0
		hum.JumpPower = 0
		hrp.Anchored = true

		-- الإمساك بالأدوات
		task.spawn(function()
			while running do
				for _, tool in ipairs(backpack:GetChildren()) do
					if tool:IsA("Tool") and isMatchingTool(tool.Name) then
						tool.Parent = char
						tool:Activate()
						task.wait(0.01)
						tool.Parent = backpack
					end
				end
				task.wait(0.01)
			end
		end)
	else
		toggleBtn.Text = "مضاد سرقه: OFF"
		toggleBtn.BackgroundColor3 = Color3.fromRGB(28,28,28)

		-- إيقاف Freeze
		frozen = false
		hum.PlatformStand = false
		hum.WalkSpeed = 16
		hum.JumpPower = 50
		hrp.Anchored = false
	end
end

toggleBtn.MouseButton1Click:Connect(toggleFunction)

-- واجهة قابلة للسحب على الجوال
local dragging = false
local dragStart = Vector2.new()
local startPos = UDim2.new()

main.InputBegan:Connect(function(input)
	if input.UserInputType == Enum.UserInputType.Touch then
		dragging = true
		dragStart = input.Position
		startPos = main.Position
		input.Changed:Connect(function()
			if input.UserInputState == Enum.UserInputState.End then
				dragging = false
			end
		end)
	end
end)

UserInputService.TouchMoved:Connect(function(touch)
	if dragging then
		local delta = touch.Position - dragStart
		main.Position = UDim2.new(startPos.X.Scale, startPos.X.Offset + delta.X, startPos.Y.Scale, startPos.Y.Offset + delta.Y)
	end
end)

print("[N60 Hub] GUI جاهز + Freeze + Tool Grab")
