
wsp = []

st = int(input("Podaj stopien wielomianu: "))

x = int(input("Podaj X do podzielenia: " ))

for i in range(0,st + 1):
    tempWs = int(input(f"Podaj wspolczynik dla potegi {st-i}: "))
    wsp.append(tempWs)

output = wsp[0]
print(output,wsp)

for i in range(1,st + 1):
    print(output)
    output = output * x + int(wsp[i])

print("wynik to", output)