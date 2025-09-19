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

-- ===================== واجهة يمين =====================
local screenGuiRight = Instance.new("ScreenGui")
screenGuiRight.Name = "N60_HUB_Right"
screenGuiRight.ResetOnSpawn = false
screenGuiRight.Parent = player:WaitForChild("PlayerGui")

local frameRight = Instance.new("Frame", screenGuiRight)
frameRight.Size = UDim2.new(0, 140, 0, 120)
frameRight.Position = UDim2.new(0.8,0,0.2,0)
frameRight.BackgroundColor3 = Color3.fromRGB(0,0,0)
frameRight.BorderColor3 = Color3.fromRGB(255,0,0)
frameRight.BorderSizePixel = 2
frameRight.Active = true
frameRight.Draggable = true

local titleRight = Instance.new("TextLabel", frameRight)
titleRight.Size = UDim2.new(1,0,0,18)
titleRight.BackgroundTransparency = 1
titleRight.Text = "N60 HUB"
titleRight.TextColor3 = Color3.fromRGB(255,255,255)
titleRight.Font = Enum.Font.SourceSansBold
titleRight.TextSize = 16

local teleportBtn = Instance.new("TextButton", frameRight)
teleportBtn.Size = UDim2.new(0.85,0,0,25)
teleportBtn.Position = UDim2.new(0.075,0,0.35,0)
teleportBtn.Text = "روح بيتك"
teleportBtn.Font = Enum.Font.SourceSansBold
teleportBtn.TextSize = 14
teleportBtn.TextColor3 = Color3.fromRGB(255,255,255)
teleportBtn.BackgroundColor3 = Color3.fromRGB(30,30,30)

local cancelBtn = Instance.new("TextButton", frameRight)
cancelBtn.Size = UDim2.new(0.85,0,0,25)
cancelBtn.Position = UDim2.new(0.075,0,0.65,0)
cancelBtn.Text = "إلغاء"
cancelBtn.Font = Enum.Font.SourceSansBold
cancelBtn.TextSize = 14
cancelBtn.TextColor3 = Color3.fromRGB(255,255,255)
cancelBtn.BackgroundColor3 = Color3.fromRGB(50,0,0)

-- ===================== واجهة يسار =====================
local screenGuiLeft = Instance.new("ScreenGui")
screenGuiLeft.Name = "N60_HUB_Left"
screenGuiLeft.ResetOnSpawn = false
screenGuiLeft.Parent = player:WaitForChild("PlayerGui")

local frameLeft = Instance.new("Frame", screenGuiLeft)
frameLeft.Size = UDim2.new(0, 140, 0, 120)
frameLeft.Position = UDim2.new(0.05,0,0.2,0)
frameLeft.BackgroundColor3 = Color3.fromRGB(0,0,0)
frameLeft.BorderColor3 = Color3.fromRGB(255,0,0)
frameLeft.BorderSizePixel = 2
frameLeft.Active = true
frameLeft.Draggable = true

local titleLeft = Instance.new("TextLabel", frameLeft)
titleLeft.Size = UDim2.new(1,0,0,18)
titleLeft.BackgroundTransparency = 1
titleLeft.Text = "N60 HUB"
titleLeft.TextColor3 = Color3.fromRGB(255,255,255)
titleLeft.Font = Enum.Font.SourceSansBold
titleLeft.TextSize = 16

local crawlBtn = Instance.new("TextButton", frameLeft)
crawlBtn.Size = UDim2.new(0.85,0,0,25)
crawlBtn.Position = UDim2.new(0.075,0,0.35,0)
crawlBtn.Text = "ازحف عليه"
crawlBtn.Font = Enum.Font.SourceSansBold
crawlBtn.TextSize = 14
crawlBtn.TextColor3 = Color3.fromRGB(255,0,0)
crawlBtn.BackgroundColor3 = Color3.fromRGB(30,30,30)

local espBtn = Instance.new("TextButton", frameLeft)
espBtn.Size = UDim2.new(0.85,0,0,25)
espBtn.Position = UDim2.new(0.075,0,0.65,0)
espBtn.Text = "كشف مكانهم"
espBtn.Font = Enum.Font.SourceSansBold
espBtn.TextSize = 14
espBtn.TextColor3 = Color3.fromRGB(255,0,0)
espBtn.BackgroundColor3 = Color3.fromRGB(30,30,30)

-- ===================== المتغيرات =====================
local vflyActive = false
local respawnCFrame
local crawlActive = false
local crawlPart
local espActive = false
local espLabels = {}

-- ===================== تحديث Respawn =====================
local function updateRespawn(char)
    local charHRP = char:WaitForChild("HumanoidRootPart")
    task.wait(1.25)
    respawnCFrame = charHRP.CFrame
end
if player.Character then updateRespawn(player.Character) end
player.CharacterAdded:Connect(updateRespawn)

-- ===================== دالة الانتقال =====================
local function moveToTarget(targetCFrame)
    if not character or not hrp then return end
    vflyActive = true
    humanoid.Sit = true
    hrp.CFrame = hrp.CFrame * CFrame.Angles(math.rad(180),0,0)

    task.spawn(function()
        while vflyActive and (hrp.Position - targetCFrame.Position).Magnitude > 1 do
            local dir = (targetCFrame.Position - hrp.Position).Unit
            hrp.CFrame = hrp.CFrame + dir * 19 * task.wait(0.03)
        end
        vflyActive = false
    end)
end

-- ===================== وظائف الأزرار =====================
teleportBtn.MouseButton1Click:Connect(function()
    if respawnCFrame then
        moveToTarget(respawnCFrame)

        -- إضافة Coil grab كل 0.10 ثانية أثناء الانتقال
        task.spawn(function()
            while vflyActive do
                local coil = nil
                for _, tool in pairs(player.Backpack:GetChildren()) do
                    if tool:IsA("Tool") and (string.find(tool.Name:lower(),"coil") or string.find(tool.Name:lower(),"combo")) then
                        coil = tool
                        break
                    end
                end
                if not coil then
                    for _, tool in pairs(character:GetChildren()) do
                        if tool:IsA("Tool") and (string.find(tool.Name:lower(),"coil") or string.find(tool.Name:lower(),"combo")) then
                            coil = tool
                            break
                        end
                    end
                end

                if coil then
                    coil.Parent = character
                    task.wait(0.10)
                    coil.Parent = player.Backpack
                else
                    task.wait(0.10)
                end
            end
        end)
    end
end)

cancelBtn.MouseButton1Click:Connect(function()
    vflyActive = false
end)

-- ===================== ازحف عليه =====================
crawlBtn.MouseButton1Click:Connect(function()
    crawlActive = not crawlActive
    crawlBtn.TextColor3 = crawlActive and Color3.fromRGB(0,255,0) or Color3.fromRGB(255,0,0)

    if crawlActive then
        if not crawlPart then
            crawlPart = Instance.new("Part")
            crawlPart.Size = Vector3.new(3,1,3)
            crawlPart.Anchored = true
            crawlPart.CanCollide = true
            crawlPart.Color = Color3.fromRGB(0,0,0)
            crawlPart.Position = hrp.Position - Vector3.new(0,3,0)
            crawlPart.Parent = workspace
        end

        task.spawn(function()
            while crawlActive and crawlPart do
                crawlPart.Position = crawlPart.Position + Vector3.new(0,30,0)
                hrp.CFrame = CFrame.new(crawlPart.Position + Vector3.new(0,3,0))
                task.wait(0.05)
            end
        end)
    else
        if crawlPart then
            crawlPart:Destroy()
            crawlPart = nil
        end
    end
end)

-- ===================== ESP Rainbow =====================
espBtn.MouseButton1Click:Connect(function()
    espActive = not espActive
    espBtn.TextColor3 = espActive and Color3.fromRGB(0,255,0) or Color3.fromRGB(255,0,0)
end)

RunService.RenderStepped:Connect(function()
    for _, p in pairs(Players:GetPlayers()) do
        if p ~= player and p.Character and p.Character:FindFirstChild("HumanoidRootPart") then
            if espActive then
                for _, part in pairs(p.Character:GetChildren()) do
                    if part:IsA("BasePart") then
                        part.Color = Color3.fromHSV(tick()%5/5,1,1)
                    end
                end
                if not espLabels[p] then
                    local billboard = Instance.new("BillboardGui")
                    billboard.Name = "ESP_Label"
                    billboard.Size = UDim2.new(0,100,0,50)
                    billboard.Adornee = p.Character.HumanoidRootPart
                    billboard.AlwaysOnTop = true
                    billboard.Parent = player.PlayerGui

                    local textLabel = Instance.new("TextLabel")
                    textLabel.Size = UDim2.new(1,0,1,0)
                    textLabel.BackgroundTransparency = 1
                    textLabel.TextScaled = true
                    textLabel.Font = Enum.Font.SourceSansBold
                    textLabel.Text = p.Name
                    textLabel.TextColor3 = Color3.fromHSV(tick()%5/5,1,1)
                    textLabel.Parent = billboard

                    espLabels[p] = textLabel
                else
                    espLabels[p].TextColor3 = Color3.fromHSV(tick()%5/5,1,1)
                end
            else
                if espLabels[p] then
                    if espLabels[p].Parent then
                        espLabels[p].Parent:Destroy()
                    end
                    espLabels[p] = nil
                end
                if p.Character then
                    for _, part in pairs(p.Character:GetChildren()) do
                        if part:IsA("BasePart") then
                            part.Color = Color3.fromRGB(163,162,165)
                        end
                    end
                end
            end
        end
    end
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
