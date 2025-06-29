using UnityEngine;
using UnityEngine.UI;
using System.Linq;

public class ParticleUI : MonoBehaviour
{
    public ParticleManager manager;
    public ParticleSpawner spawner;
    public Dropdown dropdown;

    void Start()
    {
        if (manager == null || dropdown == null)
            return;

        dropdown.ClearOptions();
        dropdown.AddOptions(manager.Types.Keys.ToList());
        dropdown.onValueChanged.AddListener(OnValueChanged);

        // initialize selection
        if (dropdown.options.Count > 0)
        {
            OnValueChanged(0);
        }
    }

    void OnValueChanged(int index)
    {
        if (index < 0 || index >= dropdown.options.Count)
            return;
        string type = dropdown.options[index].text;
        spawner.SetCurrentType(type);
    }
}
