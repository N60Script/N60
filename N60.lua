-- // الخدمات
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local hrp = character:WaitForChild("HumanoidRootPart")
local humanoid = character:WaitForChild("Humanoid")

-- تفعيل God Mode تلقائيًا
humanoid.MaxHealth = math.huge
humanoid.Health = math.huge
humanoid:SetStateEnabled(Enum.HumanoidStateType.Dead, false)
humanoid:SetStateEnabled(Enum.HumanoidStateType.Physics, false)

-- // واجهة N60 HUB مربعة أصغر
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "N60_HUB"
screenGui.ResetOnSpawn = false
screenGui.Parent = player:WaitForChild("PlayerGui")

local frame = Instance.new("Frame", screenGui)
frame.Size = UDim2.new(0, 140, 0, 120)
frame.Position = UDim2.new(0.05,0,0.2,0)
frame.BackgroundColor3 = Color3.fromRGB(0,0,0)
frame.BorderColor3 = Color3.fromRGB(255,0,0)
frame.BorderSizePixel = 2
frame.Active = true
frame.Draggable = true

local title = Instance.new("TextLabel", frame)
title.Size = UDim2.new(1,0,0,18)
title.BackgroundTransparency = 1
title.Text = "N60 HUB"
title.TextColor3 = Color3.fromRGB(255,255,255)
title.Font = Enum.Font.SourceSansBold
title.TextSize = 16

-- زر انتقال أكبر
local teleportBtn = Instance.new("TextButton", frame)
teleportBtn.Size = UDim2.new(0.85,0,0,25)
teleportBtn.Position = UDim2.new(0.075,0,0.35,0)
teleportBtn.Text = "روح بيتك"
teleportBtn.Font = Enum.Font.SourceSansBold
teleportBtn.TextSize = 14
teleportBtn.TextColor3 = Color3.fromRGB(255,255,255)
teleportBtn.BackgroundColor3 = Color3.fromRGB(30,30,30)

-- زر إلغاء أكبر
local cancelBtn = Instance.new("TextButton", frame)
cancelBtn.Size = UDim2.new(0.85,0,0,25)
cancelBtn.Position = UDim2.new(0.075,0,0.65,0)
cancelBtn.Text = "إلغاء"
cancelBtn.Font = Enum.Font.SourceSansBold
cancelBtn.TextSize = 14
cancelBtn.TextColor3 = Color3.fromRGB(255,255,255)
cancelBtn.BackgroundColor3 = Color3.fromRGB(50,0,0)

-- متغيرات
local vflyActive = false
local flipSitActive = false
local respawnCFrame

-- دالة لإيجاد coil
local function findCoil()
    for _, tool in pairs(player.Backpack:GetChildren()) do
        if tool:IsA("Tool") and (string.find(tool.Name:lower(), "coil") or string.find(tool.Name:lower(), "combo")) then
            return tool
        end
    end
    for _, tool in pairs(character:GetChildren()) do
        if tool:IsA("Tool") and (string.find(tool.Name:lower(), "coil") or string.find(tool.Name:lower(), "combo")) then
            return tool
        end
    end
    return nil
end

-- تحديث مكان Respawn بعد 1.25 ثانية من تولد الشخصية
local function updateRespawn(char)
    local charHRP = char:WaitForChild("HumanoidRootPart")
    task.wait(1.25) -- ثانية وربع
    respawnCFrame = charHRP.CFrame
end

-- أول دخول
if player.Character then
    updateRespawn(player.Character)
end
player.CharacterAdded:Connect(updateRespawn)

-- دالة الانتقال مع Flip + Sit + مسك Coil
local function moveToTarget(targetCFrame)
    if not character or not hrp then return end
    vflyActive = true
    humanoid.Sit = true
    hrp.CFrame = hrp.CFrame * CFrame.Angles(math.rad(180),0,0)
    flipSitActive = true

    local coilTask = task.spawn(function()
        while vflyActive do
            local coil = findCoil()
            if coil then
                coil.Parent = character
                task.wait(0.10)
                coil.Parent = player.Backpack
            end
            task.wait(0.10)
        end
    end)

    task.spawn(function()
        while vflyActive and (hrp.Position - targetCFrame.Position).Magnitude > 1 do
            local dir = (targetCFrame.Position - hrp.Position).Unit
            hrp.CFrame = hrp.CFrame + dir * 17 * task.wait(0.03)
        end
        vflyActive = false
    end)
end

-- وظيفة زر الانتقال
teleportBtn.MouseButton1Click:Connect(function()
    if respawnCFrame then
        moveToTarget(respawnCFrame)
    end
end)

-- وظيفة زر الإلغاء
cancelBtn.MouseButton1Click:Connect(function()
    vflyActive = false
end)

-- إعادة God Mode بعد Respawn
player.CharacterAdded:Connect(function(char)
    character = char
    hrp = character:WaitForChild("HumanoidRootPart")
    humanoid = character:WaitForChild("Humanoid")
    humanoid.MaxHealth = math.huge
    humanoid.Health = math.huge
    humanoid:SetStateEnabled(Enum.HumanoidStateType.Dead, false)
    humanoid:SetStateEnabled(Enum.HumanoidStateType.Physics, false)
end)
